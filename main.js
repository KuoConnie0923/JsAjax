$(document).ready(function () {
    $('#email').blur(function () {
        $(this).css("border-color", "")
        var emailRegxp = /^([a-zA-Z0-9_.+-])+\@(([A-Za-z0-0-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!(emailRegxp.test($(this).val()))) {
            $('.error').text('請輸入有效的電子郵件');
            $(this).css("border-color", "red")
        } else {
            $('.error').text('');
        }
    })
    $('#mobile').blur(function () {
        $(this).css("border-color", "")
        var phone = /^09[0-9]{8}$/;
        if (!(phone.test($(this).val()))) {
            $('.error1').text('請輸入有效的手機號碼');
            $(this).css("border-color", "red")
        } else {
            $('.error1').text('');
        }
    })
})

 //get資料庫   
 var settings = {
    //async為false->同步；async為true->非同步
      "async": true,
      "crossDomain": true,
    //url(String):指定要進行呼叫的位址
      "url": "https://kuokuo0923-e094.restdb.io/rest/contact",
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "x-apikey": "5ab86334f0a7555103cea7ba",
        "cache-control": "no-cache"
      },
    }
    var i=0;
    $.ajax(settings).done(function (response) {
        $.each(response,function(){
            $("#contactList thead").append("<tr id='myTableRow'>" +
                                            "<td><input id='update' class='btn btn-info' type='button' value='update' onclick='updateRow(this)'>&nbsp;<input id='delete' class='btn btn-danger' type='button' value='delete' onclick='deleteRow(this)'><input type='hidden' id='id' value='"+response[i]._id+"'></td>"+
                                            "<td>" + response[i].name   +
                                            "</td><td>" + response[i].email  + 
                                            "</td><td>" + response[i].mobile + 
                                                                              "</td></tr>");

            i++;

        });
      console.log(response);
    });

    //var ObjectID = $("#contactList thead").children().children().find('td').eq(0).find('input:nth-child(3)').val();
    //console.log(ObjectID);

$("#add").click(function () {

    
    var $contactName = $('#contactName').val();
    var $email = $('#email').val();
    var $mobile = $('#mobile').val();

    //清空input value
    $('#contactName').val("");
    $('#email').val("");
    $('#mobile').val("");

    //判斷輸入的欄位值不能為空值
    if ($contactName == '' || $email == '' || $mobile == '') {
        alert("提醒:\r\n資料輸入不全!");
        return false;
    }

    //驗證電子郵件
    var emailRegxp = /^([a-zA-Z0-9_.+-])+\@(([A-Za-z0-0-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!(emailRegxp.test($email))) {
        alert("請輸入有效的郵件地址");
        return false;
    }

    //驗證手機號碼
    //var phone = /^1[34578]\d{9}$/;
    var phone = /^09[0-9]{8}$/;
    if (!(phone.test($mobile))) {
        alert("請輸入有效的手機號碼");
        return false;
    }

    var data = $("<tr id='myTableRow'><td><input id='update' class='btn btn-info' type='button' value='update' onclick='updateRow(this)'>&nbsp;<input id='delete' class='btn btn-danger' type='button' value='delete' onclick='deleteRow(this)'><input type='hidden' id='id' value='id'></td><td>" + $contactName + "</td><td>" + $email + "</td><td>" + $mobile + "</td></tr>");
    $('#contactList thead').append(data);

    //加入資料庫
    var jsondata = {
        "name": $contactName,
        "email": $email,
        "mobile": $mobile,
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://kuokuo0923-e094.restdb.io/rest/contact",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "5ab86334f0a7555103cea7ba",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);

    });

    console.log($contactName, $email, $mobile);

    
    /*$("#contactList #update").click(function(){
        var data_update = $("<tr><td><input id='updateU' class='btn btn-info' type='button' value='update'></td><td><input id='contactNameU' type='text' value='"+$contactName+"' name ='name' required></td><td><input id='emailU' type='email' value='"+$email+"' name ='email' required></td><td><input id='mobileU' type='text' value='"+$mobile+"' name ='mobile' required></td></tr>");
        $(this).parents("tr").replaceWith(data_update);   //為甚麼不能用.html()

        var $contactNameU = $(this).parent().parent().find("td").eq(1).text();

    	var $emailU = $(this).parent().parent().find("td").eq(2).text();

    	var $mobileU = $(this).parent().parent().find("td").eq(3).text();

        console.log($contactNameU,$emailU,$mobileU);

        $("#contactList #updateU").click(function(){
            var $contactNameUU = $('#contactNameU').val();
            var $emailUU = $('#emailU').val();
            var $mobileUU = $('#mobileU').val();

        var data_update2 = $("<tr><td><input id='update' class='btn btn-info' type='button' value='update'>&nbsp;<input id='delete' class='btn btn-danger' type='button' value='delete' ></td><td>" + $contactNameUU +"</td><td>"+ $emailUU+"</td><td>"+$mobileUU+"</td></tr>");
        $(this).parents("tr").replaceWith(data_update2);
        console.log($contactNameU,$emailU,$mobileU);

        $("input[name=name]").val($contactNameUU);

    	$("input[name=email]").val($emailUU);

        $("input[name=mobile]").val($mobileUU);
        
        $("#contactList #delete").click(function () {
            $(this).parents("tr").remove();
        });
        });*/


    /* var $contactNameU = $(this).parents("tr").find("#contactNameU").val();
    var $emailU = $(this).parents("tr").find('#emailU').val();
    var $mobileU = $(this).parents("tr").find('#mobileU').val();    

    console.log($contactNameU,$emailU,$mobileU);
    var data_update_finiah = $("<tr><td><input id='updateU' class='btn btn-info' type='button' value='update'>&nbsp;<input id='delete' class='btn btn-danger' type='button' value='delete' ></td><td>" + $contactNameU +"</td><td>"+ $emailU+"</td><td>"+$mobileU+"</td></tr>");
    $('#contactList #updateU').parents("tr").replaceWith(data_update);*/

    /*$this = $('#tr').find("td");
    $this.eq(1).html(objUser.id);
    if ($('#tr').length) {
    var newHtml = '<td>' + $contactNameU + '</td>'
            + '<td>' + $emailU + '</td>'
            + '<td>' + $mobileU + '</td>';
    $('#tr').html(newHtml);
    }*/
});

//刪除--方法一
//為什麼把("#contactList #delete")改成("#delete")
/*$("#contactList #delete").click(function () {
    //$(this).parents("tr").remove();

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://kuokuo0923-e094.restdb.io/rest/contact/(ObjectID)",
        "method": "DELETE",
        "headers": {
          "content-type": "application/json",
          "x-apikey": "5ab86334f0a7555103cea7ba",
          "cache-control": "no-cache"
        }
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
});*/

//刪除--方法一-2
/*$("#my_table .remove_row").click(function () {
    $(this).parents("tr:first")[0].remove();
});*/

//刪除--點選整列的任何地方,可以刪除整列
/*$('#myTable tr').click(function(){
    $(this).remove();
    return false;
});*/

//刪除--完全沒反應
/*$('#contactList').on('click','.btn btn-danger',function(){
     console.log($contactName,$email,$mobile);
     $(this).parents('tr').remove();
   });*/

//刪除--完全沒反應
/*$("#delete").click(function(){         
    console.log($contactName,$email,$mobile);
    $('#contactList thead').closest ('tr').remove();
    //$('#contactList thead tr:last').remove();  ////刪除最後一列(row)
});*/
//$('#contactList thead').append('<tr><th>' + $contactName + '</th></tr>');




//刪除--方法二,記得在button裡加onclick='deleteRow(this)'
function deleteRow(btn) {
    //if (confirm("Are you sure want to delete thr row?"))
    $(btn).parents("tr").remove();

   //var ObjectID = $(btn).parent().find('input').val();
    var ObjectID = $(btn).parent().parent().find('td').eq(0).find('input:nth-child(3)').val();
    //var ObjectID = $(btn).closest('tr').find('td:first').text();
    console.log(ObjectID);

    //刪除資料庫
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://kuokuo0923-e094.restdb.io/rest/contact/"+(ObjectID),
        "method": "DELETE",
        "headers": {
          "content-type": "application/json",
          "x-apikey": "5ab86334f0a7555103cea7ba",
          "cache-control": "no-cache"
        }
      }
      
      $.ajax(settings).done(function (response) {
        $(btn).parents("tr").remove();
        //重整網頁
        //location.reload();
        console.log(response);
      });

      
}

//按update進入修改
function updateRow(btn) {

    //get資料庫   
 var settings = {
    //async為false->同步；async為true->非同步
      "async": true,
      "crossDomain": true,
    //url(String):指定要進行呼叫的位址
      "url": "https://kuokuo0923-e094.restdb.io/rest/contact",
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "x-apikey": "5ab86334f0a7555103cea7ba",
        "cache-control": "no-cache"
      },
    }
    var i=0;
    $.ajax(settings).done(function (response) {
        //取值顯示在input裡
    var $contactName = $(btn).parent().parent().find("td").eq(1).text();
    var $email = $(btn).parent().parent().find("td").eq(2).text();
    var $mobile = $(btn).parent().parent().find("td").eq(3).text();
    console.log($contactName, $email, $mobile);

    var data_update = $("<tr><td><input id='updateU' class='btn btn-info' type='button' value='update' onclick='updateEnd(this)'><input type='hidden' id='id' value='"+response[i]._id+"'></td><td><input id='contactNameU' type='text' value='" + $contactName + "' name ='name' required></td><td><input id='emailU' type='email' value='" + $email + "' name ='email' required></td><td><input id='mobileU' type='text' value='" + $mobile + "' name ='mobile' required></td></tr>");
    $(btn).parents("tr").replaceWith(data_update); //為甚麼不能用.html()

    i++;
    });
    

   

    /* var $contactNameU = $(btn).parent().parent().find("td").eq(1).text();

    	var $emailU = $(btn).parent().parent().find("td").eq(2).text();

        var $mobileU = $(btn).parent().parent().find("td").eq(3).text();
        
        console.log($contactNameU,$emailU,$mobileU);*/

    //console.log($contactNameU,$emailU,$mobileU);

}

//修改
function updateEnd(btn) {
    //取值
    var $contactNameUU = $('#contactNameU').val();
    var $emailUU = $('#emailU').val();
    var $mobileUU = $('#mobileU').val();

    //驗證空值
    if ($contactNameUU == '' || $emailUU == '' || $mobileUU == '') {
        alert("提醒:\r\n資料輸入不全!");
        return false;
    }

    //驗證電子郵件
    var emailRegxp = /^([a-zA-Z0-9_.+-])+\@(([A-Za-z0-0-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!(emailRegxp.test($emailUU))) {
        alert("請輸入有效的郵件地址");
        return false;
    }

    //驗證手機號碼
    //var phone = /^1[34578]\d{9}$/;
    var phone = /^09[0-9]{8}$/;
    if (!(phone.test($mobileUU))) {
        alert("請輸入有效的手機號碼");
        return false;
    }

    /*var data_update2 = $("<tr><td><input id='update' class='btn btn-info' type='button' value='update' onclick='updateRow(this)'>&nbsp;<input id='delete' class='btn btn-danger' type='button' value='delete' onclick='deleteRow(this)'><input type='hidden' id='id' value='id'></td><td>" + $contactNameUU + "</td><td>" + $emailUU + "</td><td>" + $mobileUU + "</td></tr>");
    $(btn).parents("tr").replaceWith(data_update2);
    console.log($contactNameUU, $emailUU, $mobileUU);*/

    //put修改資料庫
    var ObjectID = $(btn).parent().parent().find('td').eq(0).find('input:nth-child(2)').val();
    console.log(ObjectID);

    var jsondata = {
        "name": $contactNameUU,
        "email": $emailUU,
        "mobile": $mobileUU,};
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://kuokuo0923-e094.restdb.io/rest/contact/"+ObjectID,
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
        "x-apikey": "5ab86334f0a7555103cea7ba",
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata)
    }
    
    $.ajax(settings).done(function (response) {
        var data_update2 = $("<tr><td><input id='update' class='btn btn-info' type='button' value='update' onclick='updateRow(this)'>&nbsp;<input id='delete' class='btn btn-danger' type='button' value='delete' onclick='deleteRow(this)'><input type='hidden' id='id' value='id'></td><td>" + $contactNameUU + "</td><td>" + $emailUU + "</td><td>" + $mobileUU + "</td></tr>");
    $(btn).parents("tr").replaceWith(data_update2);
    console.log($contactNameUU, $emailUU, $mobileUU);
        //重整網頁
        //location.reload();
      console.log(response);
    });


    /* $("input[name=name]").val($contactNameUU);

    	$("input[name=email]").val($emailUU);

        $("input[name=mobile]").val($mobileUU);*/

}


//$('#add').on('click', clickHandler);

/*function clickHandler() {
    $('#contactList thead').append('<tr><th>' + $contactName + '</th></tr>');
    //$('#contactList thead').append('<tr><th>$contactName</th></tr>');
}*/