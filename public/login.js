(function(){

  $('#login').on('click',function () {
      var param = {}
      param.userid = $('#user').val()
      param.password = $('#pwd').val()
      console.log(param)
      var ajax = new XMLHttpRequest()
      ajax.open('post',"http://127.0.0.1:3535/login",true)
      ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      ajax.send(JSON.stringify(param))
      ajax.onreadystatechange = function () {
          if (ajax.readyState === 4 && ajax.status === 200) {
                          // if(ajax.status >= 200 && ajax.status < 300 || ajax.status == 304) {
                          //         alert(ajax.responseText);
                          // //    }else{
                          //      alert('Request was unsuccessful: ' + ajax.status);
                          //     alert(ajax.responseText);
              var num = JSON.parse(ajax.responseText)
                              if (num.success == '00'){
                                  c;
                              }
                              // }
                       }
          // alert(ajax.readyState+"qie"+ajax.status)
      }
  })
  $('#toregister').on('click',function(){
    $('#showlog').css('display','none')
      $('#showres').css('display','block')
  })
})()
