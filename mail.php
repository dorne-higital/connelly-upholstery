<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'plugin/PHPMailer/src/Exception.php';
require 'plugin/PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);

try {
    //Recipients
    $mail->setFrom('noreply@connellyupholstery.co.uk', 'NOREPLY');
    // $mail->addAddress('d.horne92@live.co.uk');
    $mail->addAddress('enquiries@connellyupholstery.co.uk');

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'New online Enquiry';
    $mail->Body    = 'Name:'.$_POST['name'].'<br /> Email:'.$_POST['email'].'<br /> Phone:'.$_POST['phone'].'<br /> Location:'.$_POST['location'].'<br /> Message:'.$_POST['message'].'<br />';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo '<script> window.location="../index.html"; </script>';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}


// if(isset($_POST['submit'])) {
//  $emailAddress = 'ex@ex.com';
//  require "class.phpmailer.php";
// $msg = 'First Name:'.$_POST['firstName'].'<br /> Last name:'.$_POST['lastName'].'<br /> Email:'.$_POST['email'].'<br />';
// move_uploaded_file($_FILES["uploaded_file"]["tmp_name"], $_FILES["uploaded_file"]["name"]);
//   $mail = new PHPMailer();
//   $mail->IsMail();

//   $mail->AddReplyTo($_POST['email'], $_POST['name']);
//   $mail->AddAddress($emailAddress);
//   $mail->SetFrom($_POST['email'], $_POST['name']);
//   $mail->Subject = "Subject";
//   $mail->MsgHTML($msg);
//   $mail->AddAttachment( $_FILES["uploaded_file"]["name"]);
//   $mail->Send();

//   echo'<script> window.location="../index.html"; </script> ';
// }
?>