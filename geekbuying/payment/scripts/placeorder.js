import {navbar} from '../../cart/scripts/navbar.js';

document.querySelector('#navbar').innerHTML = navbar();

let navline = document.querySelectorAll('#navText>div>p');

for (let i = 0; i < navline.length; i++) {
    if (i <= 3) continue;
    else {
        if (i % 2 === 0) {
            navline[i].style.backgroundColor = 'rgb(220, 200, 200,0.7)';
        }
        else {
            navline[i].style.backgroundColor = 'rgb(220, 200, 200,0.7)';
            navline[i].style.borderColor = 'rgb(220, 200, 200,0.7)';
        }
    }
}


let payData = JSON.parse(localStorage.getItem('payData'));
let totalPrice = 0
payData.forEach((ele)=>{
    let card = document.createElement('div');
    let img = document.createElement('img');
    img.src = ele.imageUrl;

    let name = document.createElement('p');
    name.innerText = ele.productData;

    let unitprice = document.createElement('p');
    unitprice.innerText ='₹ '+ ele.offerPrice;

    let tCount = document.createElement('p');
    tCount.innerText = 'X '+ele.productCount;

    let tPrice = document.createElement('b');
    tPrice.innerText = '₹ ' + Math.round((+(ele.productCount) * (+(ele.offerPrice)/ele.productCount))*100)/100;
    totalPrice += Math.round(ele.offerPrice)
    card.append(img,name,unitprice,tCount,tPrice);

    document.querySelector('#prods').append(card);
    document.querySelector('#shipDet div:last-child>div:first-child>p:last-child').innerText = '₹ '+totalPrice;
})

function total(){
    let tPrice = totalPrice
    document.querySelector('#insure').checked?tPrice+=140:null;
    document.querySelector('#lrs').checked?tPrice+=280:null;
    document.querySelector('#shipDet div:last-child>div:nth-child(5)>p:last-child').innerText = '₹ ' + tPrice;
}

total();

document.querySelector('#insure').addEventListener('change',(event)=>{
    event.target.checked?document.querySelector('#shipDet div:last-child>div:nth-child(3)').style.display = 'flex':document.querySelector('#shipDet div:last-child>div:nth-child(3)').style.display='none'
    total();
})

document.querySelector('#lrs').addEventListener('change',(event)=>{
    event.target.checked?document.querySelector('#shipDet div:last-child>div:nth-child(4)').style.display = 'flex':document.querySelector('#shipDet div:last-child>div:nth-child(4)').style.display='none'
    total();
})

document.querySelector('#cInput+button').addEventListener('click',()=>{
    if(document.querySelector('#cInput').value){
        document.querySelector('#msg>div>p').innerText = 'Sorry! Currently no coupons are available for use. Come back later!'
        document.querySelector('#msgBox').style.display = 'block';
        document.querySelector('#msg>div>button').addEventListener('click',()=>{
            document.querySelector('#msgBox').style.display = 'none';
        })
    }
    else
        {
        document.querySelector('#msg>div>p').innerText = 'Enter Correct Coupon Code!'
        document.querySelector('#msgBox').style.display = 'block';
        document.querySelector('#msg>div>button').addEventListener('click',()=>{
            document.querySelector('#msgBox').style.display = 'none';
        })
    }
})


document.querySelector('#save').addEventListener('click',()=>{

    let inputs = document.querySelectorAll('#address input');

   for(let inp of inputs){
    if(inp.id === 'add2') continue;
    else if(inp.value===''){
        document.querySelector('#msg>div>p').innerText = 'Some of the input fields are empty. Please enter correct address details to continue!'
        document.querySelector('#msgBox').style.display = 'block';
        document.querySelector('#msg>div>button').addEventListener('click',()=>{
            document.querySelector('#msgBox').style.display = 'none';
        })

     return;
    }
   }
   
  
   let p1 = document.querySelector('#card div>p:first-child');
   p1.innerText = 'Name : '+document.querySelector('#fName').value + ' ' + document.querySelector('#lName').value;

   let p2 = document.querySelector('#card div>p:nth-child(2)');
    
   p2.innerText = 'TEL : '+document.querySelector('#number').value;

   let p3 = document.querySelector('#card div>p:nth-child(3)');
  
   p3.innerText = 'Address : '+document.querySelector('#add1').value + ' ' + document.querySelector('#city').value + ' ' + document.querySelector('#state').value+ ' ' + document.querySelector('#zip').value+ ' ' + document.querySelector('#country').value;
   document.querySelector('#card input').setAttribute('checked','true');
  document.querySelector('#card').style.display = 'flex';
  document.querySelector('#address').style.display = 'none';


  let chan = document.querySelector('#card button');
   chan.addEventListener('click',()=>{
    document.querySelector('#card input').removeAttribute('checked');
     document.querySelector('#card').style.display = 'none';
     document.querySelector('#address').style.display = 'block';
   })

})

document.querySelector('#pOrder').addEventListener('click',()=>{
    let card = document.querySelector('#card input');
    let cbox = document.querySelector('#cbox');

    console.log(card.style.display==='',card.checked)
    if(card.checked===false){
        document.querySelector('#msg>div>p').innerText = 'Please add your address deatils first before placing order!'
        document.querySelector('#msgBox').style.display = 'block';
        document.querySelector('#msg>div>button').addEventListener('click',()=>{
            document.querySelector('#msgBox').style.display = 'none';
        })
    }

    else if(cbox.checked){
        let tP = document.querySelector('#shipDet>div>div:nth-child(5)>p:last-child');

        localStorage.setItem('gTotal',tP.innerText);

        window.location.href = '../payment/pay.html';
    }
    else {
        document.querySelector('#cboxP').style.display = 'block';
    }
})

