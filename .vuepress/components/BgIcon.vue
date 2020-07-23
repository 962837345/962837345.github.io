<template>
    <div class="sm">
        <a href="#"><i class="el-icon-s-grid"></i></a>
        <a href="#"><i class="el-icon-delete-solid"></i></a>
        <a href="#"><i class="el-icon-star-off"></i></a>
        <a href="#"><i class="el-icon-video-camera-solid"></i></a>
        <a href="#"><i class="el-icon-s-comment"></i></a>
    </div>
</template>

<script>
    export default {
        name: "icon_hover",
    }
</script>

<style scoped>
    .sm {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        /*background-color: #0a3d62;*/
        background-image: linear-gradient(125deg, #2c3e50, #27ae60, #2980b9, #e74c3c, #8e44ad);
        background-size: 400%;
        animation: bganimation 15s infinite;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
    }

    @keyframes bganimation {
        0%{
            background-position: 0 50%;
        }
        50%{
            background-position: 100% 50%;
        }
        100%{
            background-position: 0 50%;
        }
    }

    a {
        margin: 0 20px;
        width: 80px;
        height: 80px;
        background-color: #ccc;
        display: inline-block;
        border-radius: 24px;
        box-shadow: 6px 6px 12px rgba(0, 0, 0, .15), -6px -6px 12px rgba(255, 255, 255, .1);
        overflow: hidden;
        font-size: 28px;
        transition: .3s linner;
        position: relative;
    }

    a:hover {
        transform: scale(1.3);
        border-radius: 50%;
    }

    a i::before {
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        background-size: 200% 200%;
        background-position: 75% 75%;
        top: 0;
        left: 0;
        line-height: 80px;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: background .5s linear;
    }

    a:hover i::before {
        background-position: 0 0;
    }

    .el-icon-s-grid::before {
        background-image: linear-gradient(135deg, #984f00 30%, #0a3d62 50%);
    }

    .el-icon-delete-solid::before {
        background-image: linear-gradient(135deg, #1da1f2 30%, #0a3d62 50%);
    }

    .el-icon-star-off::before {
        background-image: linear-gradient(135deg, #c32aa3 30%, #0a3d62 50%);
    }

    .el-icon-video-camera-solid::before {
        background-image: linear-gradient(135deg, #d71e18 30%, #0a3d62 50%);
    }

    .el-icon-s-comment::before {
        background-image: linear-gradient(135deg, #007bb5 30%, #0a3d62 50%);
    }
</style>