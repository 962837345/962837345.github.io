def bubble_sort(need_sorted_list: list) -> list:
    """ 冒泡排序 """
    for i in range(len(need_sorted_list) - 1):
        for j, num1 in enumerate(need_sorted_list):
             if j < len(need_sorted_list) - 1 - i:
                 num2 = need_sorted_list[j + 1]
                 if num1 > num2:
                     temp_num = need_sorted_list[j]
                     need_sorted_list[j] = num2
                     need_sorted_list[j + 1] = temp_num
    return need_sorted_list

def selection_sort(need_sorted_list: list) -> list:
    """ 选择排序 """
    
    # 思路实现
    ordered_list = []
    for _ in range(len(need_sorted_list)):
        max_num = max(need_sorted_list)
        need_sorted_list.remove(max_num)
        ordered_list.append(max_num)
    return ordered_list

def selection_sort(need_sorted_list: list) -> list:
    """ 选择排序 """
   
    # 索引实现
    for i in range(len(need_sorted_list) - 1):
        min_idx = i
        for j in range(i + 1, len(need_sorted_list)):
            if need_sorted_list[j] > need_sorted_list[min_idx]:
                min_idx = j
        
        if i != min_idx:
            temp_num = need_sorted_list[i]
            need_sorted_list[i] = need_sorted_list[min_idx]
            need_sorted_list[min_idx] = temp_num


def insert_sorted(need_sorted_list: list) -> list:
    """ 插入排序 """
    for i in range(1, len(need_sorted_list)):
        temp_num = need_sorted_list[i]
        cur_idx = i
        for j in range(i - 1, -1, -1):
            cur_num = need_sorted_list[j]         
            if temp_num < cur_num:
                need_sorted_list[j+1] = need_sorted_list[j]
                cur_idx = j
            else:
                break
        
        need_sorted_list[cur_idx] = temp_num
    return need_sorted_list

def insert_sorted(need_sorted_list: list) -> list:
    """ 插入排序 """
    for i in range(1, len(need_sorted_list)):
        pre_index = i - 1
        current = need_sorted_list[i]
        while(pre_index >= 0 and need_sorted_list[pre_index] > current):
            need_sorted_list[pre_index + 1] = need_sorted_list[pre_index]
            pre_index -= 1
        need_sorted_list[pre_index + 1] = current
    return need_sorted_list


def shell_sort(need_sorted_list: list) -> list:
    """ 希尔排序 """
    gap = int(len(need_sorted_list) / 2)
    while(gap > 0):
        for i in range(gap, len(need_sorted_list)):
            j = i
            temp_num = need_sorted_list[i]
            if temp_num < need_sorted_list[j - gap]:
                while ((j - gap) >= 0) and need_sorted_list[j - gap] > temp_num:
                    need_sorted_list[j] = need_sorted_list[j - gap]
                    j = j - gap
                need_sorted_list[j] = temp_num
        gap = int(gap / 2)
    return need_sorted_list


test_list = [2, 4, 6, 1, 6, 3, 2]
# test_list = [4, 2, 6, 1, 6, 3, 2]

new_test_list = shell_sort(test_list)
print(f'new_test_list = {new_test_list}') 
