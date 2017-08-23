<?php
/**
 * User:教练订单
 * Date: 2017/7/30
 * Time: 10:45
 */
/*----------------------------基础验证------------------------------------*/
include_once('safe.php');//防注入代码
$token = isset($_POST['token'])?$_POST['token']:'';//获取token
if($token==''){
    echo json_encode(array('status'=>250,'msg'=>'token不能为空'));
    return;
}

/*----------------------------接收参数------------------------------------*/
$status = isset($_POST['status'])?$_POST['status']:'';//获取status
if($status==''){
    echo json_encode(array('status'=>250,'msg'=>'status不能为空'));
    return;
}

/*----------------------------token验证------------------------------------*/

include_once "database.php";//链接数据库
$sql = "select * from user WHERE token='$token'";
$res = $mySQLi -> query($sql);
$user_id='';
$role_id='';
while($row = $res -> fetch_array()){
    $user_id = $row['user_id'];
    $role_id = $row['role_id'];
}
if($user_id==''){
    echo json_encode(array('status'=>250,'msg'=>'token错误'));
    return;
}
    $sql ="select teacher_id from teacher WHERE user_id = $user_id";
    $opq =$mySQLi->query($sql);
    $teacher_id='';
    while ($row=$opq->fetch_array()) {
        $teacher_id=$row['teacher_id'];
    }
if($role_id == 2){
        $sql = "select * from teacher_order WHERE teacher_id='$teacher_id' and order_status='$status' ";
        $res = $mySQLi->query($sql);
        $school = '';
        while($row = $res -> fetch_array()){
            $school[] = $row;
             $user_id = $row['user_id'];
        }
        $sql = "select user_name from user_info WHERE user_id=$user_id";
        $data = $mySQLi->query($sql);
        while ($info= $data->fetch_array()) {
            $user_name=$info['user_name'];
            $user_photo=$info['photo'];
        }
    $school['user_name']=$user_name;
    $school['user_photo']=$user_photo;
    $mySQLi->close();//关闭数据库
    if($res){
       echo json_encode(array('status'=>200,'array'=>$school));

    }
}
