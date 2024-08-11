import unittest, logging, gc

class TestIsLambda(unittest.TestCase):
    def test_basic(self):
        from core.utils import is_lambda
        normal_lambda = lambda: None
        def normal_func():
            pass
        class Class(object):
            member_lambda = lambda: None
            def __init__(self):
                self.inst_lambda = lambda: None
            def member_func(self):
                pass
        inst = Class()
        self.assertTrue(is_lambda(normal_lambda))
        self.assertFalse(is_lambda(normal_func))
        self.assertTrue(is_lambda(Class.member_lambda))
        self.assertFalse(is_lambda(Class.member_func))
        self.assertFalse(is_lambda(inst.member_lambda), 'Should be method')# Or should we consider it as a lambda too?
        print(type(inst.member_lambda))
        self.assertFalse(is_lambda(inst.member_func))
        self.assertTrue(is_lambda(inst.inst_lambda))


from core.reactive import ReactiveObject
from core.forward_access import ForwardAccess
from core.watcher import FunctionWatcher, FunctionWatcher, ExpressionWatcher
from core.watcher import pause_watcher_update, flush_watcher_update
from core.properties import ReactiveProperty, ReactiveList, ReactiveDict, ComputedMember

step_count = 0
def walk():
    global step_count
    step_count += 1

class TestReactive(unittest.TestCase):
    def setUp(self):
        global step_count
        step_count = 0

    def check_step_count(self, num):
        # return # ComputedMember refactoring
        self.assertEqual(step_count, num, 'The step cnt is not we expected')

    def test_function_watcher(self):
        class Life(ReactiveObject):
            hp = 100  
            armor = 50
            total_hp = 0
        l = Life()
        def update_total_up():
            l.total_hp = l.hp + l.armor
            walk()
        def check_total_hp_and_step(total_hp, step):
            self.assertEqual(l.total_hp, total_hp)
            self.check_step_count(step)
        # Setup FunctionWatcher to run update_total_up
        watcher = FunctionWatcher(update_total_up)
        check_total_hp_and_step(150, 1)
        # Set dependency hp
        l.hp = 200
        check_total_hp_and_step(250, 2)
        l.armor = 100
        check_total_hp_and_step(300, 3)
        # Pause watcher update
        pause_watcher_update()
        l.hp = 300
        check_total_hp_and_step(300, 3)
        l.armor = 200
        check_total_hp_and_step(300, 3)
        flush_watcher_update()
        # All dirty dependencies should be flushed by a single pass
        check_total_hp_and_step(500, 4)
        # Decrease refcnt to cause Watcher's destruction
        watcher = None
        l.hp = 400
        check_total_hp_and_step(500, 4)
        l.armor = 500
        check_total_hp_and_step(500, 4)

    def test_computed_member(self):
        class Life(ReactiveObject):
            hp = 100
            armor = 50
            total_hp = lambda self: self.get_total_up()
            def get_total_up(self):
                walk()
                return self.hp + self.armor
            def __del__(self):
                walk()
        l = Life()
        def update_total_up():
            tmp = l.total_hp
            walk()
        def check_total_hp_and_step(in_total_hp, step):
            self.assertEqual(l.total_hp, in_total_hp)
            self.check_step_count(step)
        # Computed property is lazy
        self.check_step_count(0)
        # Evaluate on first explicit reading
        check_total_hp_and_step(150, 1)
        # Skip evaluate if no dirty dependency (i.e l.hp and l.armor)
        check_total_hp_and_step(150, 1)
        l.hp = 200
        l.armor = 1
        # Dependency's change won't trigger an update
        self.check_step_count(1)
        # Evaluate again if exists any dirty dependency
        check_total_hp_and_step(201, 2)
        # Setup watcher to subscribe total_hp
        watcher = FunctionWatcher(update_total_up) # update_total_hp get called
        check_total_hp_and_step(201, 3)
        # ComputeProperty is no longer lazy when it has some subscriber
        l.hp = 250
        # Life.get_total_up and update_total_hp both get called
        self.check_step_count(5)
        check_total_hp_and_step(251, 5)
        # pause_watcher_update also works for ComputedMember
        pause_watcher_update()
        l.hp = 111
        l.armor = 222
        self.check_step_count(5) # Nothing gets called
        # However an explicit read can still trigger an evaluation
        check_total_hp_and_step(333, 6) # Life.get_total_up get called
        l.hp = 1
        l.armor = 2
        flush_watcher_update()
        # Dirty dependencies can be flushed within a single pass
        # Life.get_total_up and update_total_hp both get called
        check_total_hp_and_step(3, 8)
        # Stop FunctionWatcher, the ComputedMember becomes lazy again when has no subscribers
        watcher = None
        l.hp = 50
        l.armor = 100
        self.check_step_count(8) # Nothing gets called
        check_total_hp_and_step(150, 9) # Life.get_total_hp get called
        # ComputedMember has no strong reference to its owner
        l = None # Life gets deallocated when no more referer
        self.check_step_count(10) # Life.__del__ get called

    def test_reactive_list(self):
        class Char(ReactiveObject):
            hp = 0
            armor = 0
            total_hp = lambda self: self.hp + self.armor
            def __init__(self, hp=0, armor=0):
                self.hp = hp
                self.armor = armor
        class Game(ReactiveObject):
            chars = [Char(100), Char(200)]
            # total_hp_sum = lambda self: sum([char.total_hp for char in self.chars])
            total_hp_sum = lambda self: self.get_hp_sum()
            def get_hp_sum(self):
                walk()
                return sum([char.total_hp for char in self.chars])
        def check_hp_sum_and_step(hp_sum, step_cnt):
            self.assertEqual(g.total_hp_sum, hp_sum)
            self.check_step_count(step_cnt)
        g = Game()
        self.check_step_count(0) # Nothing get called
        check_hp_sum_and_step(300, 1)
        # Change an item's property
        g.chars[0].hp = 200
        check_hp_sum_and_step(400, 2)
        g.chars[1].armor = 100
        check_hp_sum_and_step(500, 3)
        # Remove an item
        g.chars.pop()
        check_hp_sum_and_step(200, 4)
        # Add an item
        g.chars.append(Char(100))
        check_hp_sum_and_step(300, 5)
        # Replace whole list
        g.chars = [Char(1), Char(2)]
        check_hp_sum_and_step(3, 6)
        # Clear whole list
        g.chars.clear()
        check_hp_sum_and_step(0, 7)

    def test_sub_class(self):
        class A(ReactiveObject):
            a = 1
        class B(A):
            b = 2
            b_l = []
        class C(B):
            c = lambda self: self.a + self.b
        a = A()
        self.assertEqual(a.a, 1)
        b = B()
        print(dir(b))
        self.assertEqual(b.a, 1)
        self.assertEqual(b.b, 2)
        self.assertEqual(b.b_l, [])
        c = C()
        self.assertEqual(c.a, 1)
        self.assertEqual(c.b, 2)
        self.assertEqual(c.b_l, [])
        self.assertIsNot(c.b_l, b.b_l) # Equal but not the same list
        self.assertEqual(c.c, 3)

    def test_member_override(self):
        class A(ReactiveObject):
            val = 1
        class B(A):
            val = [1, 2]
        class C(B):
            val = lambda self: 'foo'
        a = A()
        b = B()
        c = C()
        self.assertEqual(a.val, 1)
        self.assertEqual(b.val, [1, 2])
        self.assertEqual(c.val, 'foo')

    def test_attribute_type(self):
        import types
        class Class(ReactiveObject):
            mem_int = 0
            mem_lambda = lambda self: 1
            mem_list = []
            mem_dict = {}
            def __init__(self):
                self.inst_int = 1
            def mem_func(self):
                pass
        ins = Class()
        self.assertIsInstance(Class.mem_int, ForwardAccess)
        self.assertIsInstance(Class.mem_lambda, ForwardAccess)
        self.assertIsInstance(Class.mem_list, ForwardAccess)
        self.assertIsInstance(Class.mem_dict, ForwardAccess)
        self.assertIsInstance(Class.mem_func, types.FunctionType)
        self.assertIsInstance(ins.inst_int, int)
        self.assertIsInstance(ins.mem_int, int)
        self.assertIsInstance(ins.mem_lambda, int)
        self.assertIsInstance(ins.mem_list, ReactiveList)
        self.assertIsInstance(ins.mem_dict, ReactiveDict)
        self.assertIsInstance(ins.mem_func, types.MethodType)

    def test_simple_loop(self):
        class LoopTest(ReactiveObject):
            x = 0
            y = lambda self: self.x * 2
            z = 0
        a = LoopTest()
        def loop():
            if a.x < 10:
                a.x = a.x + 1
            a.z = a.y + 100
            walk()
        w = FunctionWatcher(loop)
        self.assertEqual(a.x, 10)
        self.assertEqual(a.y, 20)
        self.assertEqual(a.z, 120)
        self.check_step_count(11)

    def test_dirty_set_optimization(self):
        class Test(ReactiveObject):
            a = 0
            b = 0
            c = 0
        t = Test()
        def process():
            t.b = t.a + 1
            t.c = t.b + 1
            walk()
        def assert_abc_count(a, b, c, cnt):
            self.assertEqual(t.a, a)
            self.assertEqual(t.b, b)
            self.assertEqual(t.c, c)
            self.check_step_count(cnt)
        w = FunctionWatcher(process)
        assert_abc_count(0, 1, 2, 1)
        t.a = 2
        assert_abc_count(2, 3, 4, 2)
        t.b = 5
        assert_abc_count(2, 3, 4, 3)
        t.c = 5
        assert_abc_count(2, 3, 5, 3) # Watcher doesn't know
        def test_declaration_2():
            t.c = t.b + 1
            t.b = t.a + 1
            walk()
        w = FunctionWatcher(test_declaration_2)
        assert_abc_count(2, 3, 4, 4)
        t.a = 5
        assert_abc_count(5, 6, 7, 6) # Can only run twice declaration to make it right

    def test_state_event_binding(self):
        from core import EventEmitter, when, run
        e = EventEmitter()
        # Test
        s = when(e, [('foo', walk)])
        e.emit('foo')
        self.check_step_count(1)
        e.emit('bar')
        self.check_step_count(1)
        # State will be destructed
        s = None
        e.emit('foo')
        self.check_step_count(1)
        # Test SubState
        w = run(lambda: when(e, [('bar', walk)]))
        e.emit('foo')
        self.check_step_count(1)
        e.emit('bar')
        self.check_step_count(2)
        w = None
        e.emit('bar')
        self.check_step_count(2)

    def test_state_existence(self):
        from core import there_is, run
        lighting = False
        class Light(object):
            def __init__(self):
                nonlocal lighting
                lighting = True
            def __del__(self):
                nonlocal lighting
                lighting = False
        def check_lighting(l):
            self.assertEqual(lighting, l)
        a = there_is(Light)
        check_lighting(True)
        a = None
        check_lighting(False)
        # Test SubState
        class World(ReactiveObject):
            god = False
        world = World()
        def bible():
            if world.god:
                there_is(Light)
        w = run(bible)
        check_lighting(False)
        world.god = True
        check_lighting(True)
        world.god = False
        check_lighting(False)
        # Destruct declaration, and SubState will be destructed too
        world.god = True
        check_lighting(True)
        w = None
        check_lighting(False)
        world.god = True
        check_lighting(False)

    def test_foreach(self):
        from core import foreach
        class Cls(ReactiveObject):
            l = [1, 2, 3]
        inst = Cls()
        total = 0
        def on_add(num):
            nonlocal total
            total += num
        def on_remove(num):
            nonlocal total
            total -= num
        def check_total(num):
            self.assertEqual(total, num)
        w = foreach(inst.l, on_add, on_remove)
        check_total(6)
        inst.l.append(1)
        check_total(7)
        inst.l.remove(3)
        check_total(4)
        inst.l.clear()
        check_total(0)
        inst.l = [3, 3, 3]
        check_total(9)




if __name__ == '__main__':
    try:
        unittest.main()
    except:
        pass
