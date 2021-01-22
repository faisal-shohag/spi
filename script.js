let Colors = {
  0: "var(--primary)",
  1: "var(--blue)",
  2: "var(--indigo)",
  3: "var(--purple)",
  4: "var(--pink)",
  5: "var(--red)",
  6: "var(--orange)",
  7: "var(--green)",
  8: "var(--teal)",
  9: "var(--info)",
  10: "var(--dark)",
};

var dd = new Date();
dd = (dd.toString()).split(' ');
var dateRef = dd[2]+'|'+dd[1]+'|'+dd[3];
var TodayDate = dd[1]+' '+dd[2]+', '+dd[3];

var reportDate = new Date();
window.addEventListener("online", () => {
  $('.swal2-confirm').click();
  M.toast({
    html: "Back online",
    classes: "green"
  });
});
window.addEventListener("offline", () => {
  Swal.fire('You are offline now!', 'Please check your internet connections!', 'info');
});


setTimeout(function(){
  $('.splash').hide('slow');
}, 3000)

// Random Color
$(".header").css("background-color", Colors[Math.floor(Math.random() * 11)]);

$(document).ready(function () {
  $(".modal").modal();
});
$(document).ready(function(){
  $('select').formSelect();
  
});

const router = new Navigo('/');

    const app = document.querySelector("#app");

    router.on({
        "/": function () {
          $('.header .title').html(`<i class="icofont-graduate"></i> Student Payment Info<br />
          `);
      
          $('.messages').click(function(){
            router.navigate('/messages');
          })
      
      
          db.ref('spi/loginInfo/admin/').on('value', adminName=>{
            $('.adminUsername').text(adminName.val().username);
          });
      
          $('.adminLoginInfo').click(function(){
            $('#adminModal').modal('open');
          db.ref('spi/loginInfo/admin/').on('value', admin=>{
            $('.adminUsername').text(admin.val().username);
            $('#adminName').val(admin.val().username);
            $('#adminPassword').val(admin.val().password);
            $('#edit-adminInfo').click(function(){
              let AdminLogin = {
                username: $('#adminName').val(),
                password: $('#adminPassword').val()
              }
              db.ref('spi/loginInfo/admin/').update(AdminLogin);
              Swal.fire({
                title: 'Changed Successfully',
                icon: 'success'
              })
              $('#adminModal').modal('close');
            })
          })
          })
      
          app.innerHTML = `
                <div style="margin-top: 75px" class="counter">
               
                <div id="payble" class="payble">
                <a href="/payble" data-navigo>
                <div id="paybleCount" class="paybleCount">  <div class="preloader-wrapper small active">
                <div class="spinner-layer spinner-green-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div></div>
                <div class="payble_text">Student Should Pay</div>
                </a>
                </div>
             
               
                <div id="paid" class="payble">
                <a href="/payments" data-navigo>
                <div id="paidCount" class="paybleCount">  <div class="preloader-wrapper small active">
                <div class="spinner-layer spinner-red-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div></div>
                <div class="payble_text">Student have Paid</div>
                </div>
                </a>
                </div>
      
      
                <a href="#!/" class="btn-floating add btn-large waves-effect waves-light"><i class="material-icons">add</i></a>
                <div class="students">
                <div class="loader">
                <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
                </div>
                </div>
                `;
      
                db.ref('spi/payments/').on('value', allPay=>{
                    let paymentsArray= [];
                    allPay.forEach(pay=>{
                       // console.log(pay.val());
                       paymentsArray.push(pay.val());
                    });
                    $('#paidCount').html(paymentsArray.length);
                })
          db.ref("spi/students").on("value", (snap) => {
            $(".students").html(``);
            let count=0;
            if(snap.val() === null){
              document.querySelector(".students").innerHTML = `
              <div class="noData">
              <div class="">
              <i class="icofont-dropbox big"></i><br>
              <div class="noDataText">No Data!</div>
              </div
              </div>
              `;
              //console.log('null')
            }
            snap.forEach((item) => {
              //console.log(item.val())
              document.querySelector(".students").innerHTML += `
                        <a href="#studentModal" class="modal-trigger std" id="${
                          item.key
                        }"><div class="stdentList">
                        <div class="ln">
                        <div class="logo" style="background: ${logoColor(
                          firstLetter(item.val().name)
                        )}">${firstLetter(item.val().name)}
                        </div>
                        <div class="title">${item.val().name}</div>
                        <div class="startingDate">Started: ${item.val().startingDate}</div>
                        </div>
                        <div class="st" style="background:${isPaid(item.val().paymentStatus).color};" id="pStatus">${isPaid(item.val().paymentStatus).text}</div>
                        <div style="background: var(--dark); min-width: 67px;" id="pStatus"> <div class="count">${
                          item.val().present
                        }/${item.val().monthEnd}</div>days</div>
                        </div>
                        </div></a>
                        `;
                       if(item.val().paymentStatus===false){
                        if(parseInt(item.val().present)>=parseInt(item.val().monthEnd)){
                          count++;
                        }
                      }
            });
      
            $('#paybleCount').html(count);
      
            $(".std").click(function () {
              let key = $(this)[0].id;
              //console.log(key);
              db.ref("spi/students/" + key).on("value", (std) => {
                $(".logos").html(`<div class="logo" style="background: ${logoColor(
                  firstLetter(std.val().name)
                )}">${firstLetter(std.val().name)}</div>
                          <div style="font-size: 18px; font-weight: bold;">${
                            std.val().name
                          }
                          </div>
                          <span style="background:${isPaid(std.val().paymentStatus).color};" id="pStatus">${isPaid(std.val().paymentStatus).text}</span>
                          `);
                $(".counted").html(
                  `<div style="color: var(--danger)" class="count">${std.val().present} Day(s)</div> 
                  `
                );
                $(".options").html(`
                          <button class="btn purple present"><i class="icofont-ui-add left"></i>Count<div>
                          <button class="btn green paid"><i class="icofont-check left"></i>Paid</div>
                          <button class="btn red reset"><i class="icofont-refresh left"></i>Reset</div>
                          `);
                 if(std.val().paymentStatus===true){
                   $('.paid').prop('disabled', true);
                 }else{
                  $('.paid').prop('disabled', false);
                 }
      
                $(".present").click(function () {
                  $("#countModal").modal("open");
                  $('.count-input').val(TodayDate);
                  $('#count-save').off().click(function(){
                    let presentCount;
                      db.ref("spi/students/"+key+'/present').on('value', p=>{
                           presentCount=p.val();
                       });
                    db.ref("spi/students/"+key).update({present: parseInt(presentCount)+1});
                    db.ref("spi/students/"+key+"/presents").push({date: TodayDate});
                    $("#countModal").modal("close");
                    Swal.fire("Counted", "", "success");
                  })
        
                });
      
                $(".paid").click(function () {
                  $("#payModal").modal("open");
                  $('.pay-input').val(TodayDate);
                  $('#pay-save').off().click(function(){
                    var today = new Date();
                     today = (today.toString()).split(' ');
                     let date = today[2]+' '+today[1]+' '+today[3];
                     db.ref("spi/students/"+key).update({paymentStatus: true});
                    db.ref("spi/students/"+key+'/payments').push({date: date});
                    db.ref('spi/payments/').push({name: std.val().name, date: date});
                    $("#payModal").modal("close");
                    Swal.fire("Listed as Paid!", "", "success");
                  });
                });
                
                $(".reset").click(function () {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "All data will be reset!",
                    showCancelButton: true,
                    confirmButtonText: `Yes`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      Swal.fire("Reset Successfull!", "", "success");
                      var today = new Date();
                       today = (today.toString()).split(' ');
                       let date = today[2]+' '+today[1]+' '+today[3];
                       db.ref("spi/students/"+key).update({paymentStatus: false, present: 0});
                    } else if (result.isDenied) {
                      Swal.fire("Changes are not saved", "", "info");
                    }
                  });
                });
      
      
                $(".delete").click(function () {
                  Swal.fire({
                    title: "Are you sure?",
                    icon: 'warning',
                    text: "All data will be deleted!",
                    showCancelButton: true,
                    confirmButtonText: `Yes`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      Swal.fire("Deleted!", "", "success").then(r=>{
                        //window.location.reload();
                        db.ref("spi/students/"+key).remove();
                      })
                       $("#studentModal").modal("close");
                    } else if (result.isDenied) {
                      Swal.fire("Changes are not saved", "", "info");
                    }
                  });
                });
             
                $(".edit-icon").click(function () {
                  $('#edit-name').val(std.val().name);
                  //$('#edit-class').val(std.val().class);
                 // $('#edit-day').val(std.val().present);
                  $('#edit-password').val(std.val().password);
                  $('#edit-monthEnds').val(std.val().monthEnd);
                  $("#edit-datepicker").val(std.val().startingDate);
                  
      
                    $('#edit-save').click(function(){
                  Swal.fire({
                    title: "Are you sure?",
                    icon: 'warning',
                    text: "All data will be saved!",
                    showCancelButton: true,
                    confirmButtonText: `Yes`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      Swal.fire("Saved Successfully!", "", "success").then(r=>{
                        //window.location.reload();
                        let studentEditData = {
                          name: $("#edit-name")[0].value,
                          password: $("#edit-password")[0].value,
                          //present: $("#edit-day")[0].value,
                          startingDate: $("#edit-datepicker")[0].value,
                          monthEnd: $("#edit-monthEnds")[0].value
                        };
                         db.ref("spi/students/"+key).update(studentEditData);
                         $("#editModal").modal("close");
                      });
                      
                    } else if (result.isDenied) {
                      Swal.fire("Changes are not saved", "", "info");
                    }
                  });
      
                })
      
                });
      
      
      
               //Show payments history
               db.ref('spi/students/'+key+'/payments').on('value', paid=>{
                  document.querySelector('#myPayments').innerHTML='';
                  if(paid.val() === null){
                    document.querySelector("#myPayments").innerHTML = `
                    <div class="noDataSmall">
                    <div class="">
                    <i class="icofont-dropbox small"></i><br>
                    <div class="noDataText">No Data!</div>
                    </div
                    </div>
                    `;
                  }
                  paid.forEach(pay=>{
                      document.querySelector('#myPayments').innerHTML+=`
                  <div class="list paylist" id="${pay.key}">
                  <div class="date">${pay.val().date} <i class="icofont-ui-delete"   id="payment-delete"></i></div>
                  </div>
                  `;
                  });
      
                  $('.paylist').click(function(){
                    let smallDelKey = $(this)[0].id;
                    //console.log(smallDelKey)
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        db.ref('spi/students/'+key+'/payments/'+smallDelKey).remove();
                        Swal.fire(
                          'Deleted!',
                          'success'
                        )
                      }
                    });
                  });
      
               })
               //Show present history
               db.ref('spi/students/'+key+'/presents').on('value', presents=>{
                document.querySelector('#myPresents').innerHTML='';
                if(presents.val() === null){
                  document.querySelector("#myPresents").innerHTML = `
                  <div class="noDataSmall">
                  <div class="">
                  <i class="icofont-dropbox small"></i><br>
                  <div class="noDataText">No Data!</div>
                  </div
                  </div>
                  `;
                }
                presents.forEach(presentss=>{
                    document.querySelector('#myPresents').innerHTML+=`
                <div class="list prelist" id="${presentss.key}">
                <div class="date">${presentss.val().date}           <i class="icofont-ui-delete" id="present-delete"></i></div>
                </div>
                `;
                });
      
                $('.prelist').off().click(function(){
                  let smallDelKey = $(this)[0].id;
                  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      db.ref('spi/students/'+key+'/presents/'+smallDelKey).remove();
                      Swal.fire({
                        title: 'Deleted!',
                        icon: 'success'
                      }
                      )
                    }
                  });
                })
             })
      
              });
            });
          });
      
          function isPaid(status){
              if(status===true){
                  return {
                      text: 'Paid',
                      color: 'var(--success)'
                  }
              }else{
           return {
              text: 'Not Paid',
              color: 'var(--danger)'
          }
              }
          }
      
          $(".add").css("background-color", Colors[Math.floor(Math.random() * 11)]);
          $(".add").click(function () {
            $(document).ready(function () {
              $("#addModal").modal();
              $("#addModal").modal("open");
            });
      
            $("#save").off().click(function () {
              //console.log('save');
              if ($("#name")[0].value != "" && $("#password")[0].value != "") {
                let studentData = {
                  name: $("#name")[0].value,
                  password: $("#password")[0].value,
                  startingDate: $("#datepicker")[0].value,
                  monthEnd: $("#monthEnds")[0].value,
                  paymentStatus: false,
                  present: 0,
                };
        
                db.ref("spi/students").push(studentData);
                Swal.fire({
                  title: "Saved!",
                  icon: "success",
                }).then((done) => {
                  $("#name").val(null);
                  $("#class").val(null);
                  $("#addModal").modal("close");
                });
              } else {
                Swal.fire({
                  title: "Please fill all the fields!",
                  icon: "warning",
                });
              }
            });
      
          });
      
          
        },
      
        "/payments": function(){
            $('.header .title').html(`<a href="/" data-navigo><span style="vertical-align: middle; color: #fff;" class="material-icons">keyboard_backspace</span></a>Payment History`);
            app.innerHTML=`
            <div class="studentsPayments">
            <div class="loader">
                <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
                </div>
            </div>
            `;
            db.ref("spi/payments/").on("value", (snap) => {
              document.querySelector(".studentsPayments").innerHTML = ``;
              if(snap.val() === null){
                document.querySelector(".studentsPayments").innerHTML = `
                <div class="noData">
                <div class="">
                <i class="icofont-dropbox big"></i><br>
                <div class="noDataText">No Data!</div>
                </div
                </div>
                `;
                //console.log('null')
              }
              snap.forEach((item) => {
               
                document.querySelector(".studentsPayments").innerHTML += `
                         <div class="stdentList clickToDelete" id="${item.key}">
                          <div class="ln">
                          <div class="logo" style="background: ${logoColor(
                            firstLetter(item.val().name)
                          )}">${firstLetter(item.val().name)}
                          </div>
                          <div class="title">${item.val().name}</div>
                          </div>
                          <div style="background:red;" id="pStatus">${item.val().date}</div>
                          </div>
                          </div>
                          `;
              });
      
               $('.clickToDelete').click(function(){
                 let delKey = $(this)[0].id;
                 //console.log(delKey);
                  Swal.fire({
                    title: "Are you sure?",
                    icon: 'warning',
                    text: "This will be deleted from here!",
                    showCancelButton: true,
                    confirmButtonText: `Yes`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      Swal.fire("Deleted!", "", "success").then(r=>{
                        //window.location.reload();
                        db.ref("spi/payments/"+delKey).remove();
                      })
                       $("#studentModal").modal("close");
                    } else if (result.isDenied) {
                      Swal.fire("Changes are not saved", "", "info");
                    }
                  });
               })
      
      
          });
        },
      
      
        "/payble": function(){
          $('.header .title').html(`<a href="/"><span style="vertical-align: middle; color: #fff;" class="material-icons">keyboard_backspace</span></a>Should Pay`);
          app.innerHTML=`
          <div class="studentsPayble">
          <div class="loader">
              <div class="preloader-wrapper big active">
              <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>
              </div>
          </div>
          `;
          db.ref("spi/students").on("value", (snap) => {
            document.querySelector(".studentsPayble").innerHTML = ``;
            let found = false;
            snap.forEach((item) => {
             // console.log(item.val())
              if(parseInt(item.val().present) >= parseInt(item.val().monthEnd) && item.val().paymentStatus === false){
                found = true;
              document.querySelector(".studentsPayble").innerHTML += `
                       <div class="stdentList clickToPaid" id="${item.key}">
                        <div class="ln">
                        <div class="logo" style="background: ${logoColor(
                          firstLetter(item.val().name)
                        )}">${firstLetter(item.val().name)}
                        </div>
                        <div class="title">${item.val().name}</div>
                        </div>
                        <div style="background:red;" id="pStatus">${item.val().present} Day(s)</div>
                        </div>
                        </div>
                        `;
                      }
            });
      
            if(!found){
                document.querySelector(".studentsPayble").innerHTML = `
                <div class="noData">
                <div class="">
                <i class="icofont-dropbox big"></i><br>
                <div class="noDataText">No Data!</div>
                </div
                </div>
                `;
            }
        });

      },
  }).resolve();






 



    
   
    
  











// moment js for time counting
function getRelativeTime(date) {
  const d = new Date(date);
  return moment(d).fromNow();
}

//first letter picker
function firstLetter(str) {
  str = str.split("");
  return str[0];
}

function logoColor(lett) {
  if (lett === "G") return "var(--orange)";
  if (lett === "A") return "var(--orange)";
  else if (lett === "B") return "var(--success)";
  else if (lett === "X") return "skyblue";
  else if (lett === "E") return "var(--pink)";
  else if (lett === "O") return "var(--secondary)";
  else if (lett === "C") return "var(--dark)";
  else if (lett === "D") return "var(--danger)";
  else if (lett === "J") return "var(--warning)";
  else if (lett === "F") return "var(--purple)";
  else if (lett === "H") return "var(--info)";
  else if (lett === "I") return "var(--orange)";
  else if (lett === "j") return "skyblue";
  else if (lett === "K") return "var(--indigo)";
  else if (lett === "L") return "var(--cyan)";
  else if (lett === "M") return "var(--success)";
  else if (lett === "N") return "var(--primary)";
  else if (lett === "O") return "var(--teal)";
  else if (lett === "P") return "var(--dark)";
  else if (lett === "Q") return "var(--blue)";
  else if (lett === "R") return "orange";
  else if (lett === "S") return "var(--pink)";
  else if (lett === "T") return "var(--secondary)";
  else if (lett === "U") return "var(--blue)";
  else if (lett === "V") return "var(--danger)";
  else return "red";
}
