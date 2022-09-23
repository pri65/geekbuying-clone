import {navbar} from '../../cart/scripts/navbar.js';

document.querySelector('#navbar').innerHTML = navbar();

let navline = document.querySelectorAll('#navText>div>p');

for (let i = 0; i < navline.length; i++) {
    if (i <= 5) continue;
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

document.querySelector('#ordDiv>p:first-child>b').innerText = Math.round((100000+(Math.random()*1000000)));

document.querySelector('#ordDiv>p:nth-child(2)>b').innerText = localStorage.getItem('gTotal');

document.querySelector('#ordDiv>p:nth-child(3)>b').innerText = localStorage.getItem('gTotal');

document.querySelector('#klarna input').addEventListener('click',()=>{
    document.querySelector('#msg>div>p').innerText = 'Sorry! Currently we are not accepting payments via Klarna from your location. Try another payment method!'
    document.querySelector('#msgBox').style.display = 'block';
    document.querySelector('#msg>div>button').addEventListener('click',()=>{
        document.querySelector('#klarna input').checked = '';
        document.querySelector('#msgBox').style.display = 'none';
    })
})

document.querySelector('#sofort input').addEventListener('click',()=>{
    document.querySelector('#msg>div>p').innerText = 'Sorry! Currently we are not accepting payments via Sofort from your location. Try another payment method!'
    document.querySelector('#msgBox').style.display = 'block';
    document.querySelector('#msg>div>button').addEventListener('click',()=>{
        document.querySelector('#sofort input').checked = '';
        document.querySelector('#msgBox').style.display = 'none';
    })
})

document.querySelector('#giropay input').addEventListener('click',()=>{
    document.querySelector('#msg>div>p').innerText = 'Sorry! Currently we are not accepting payments via Giropay from your location. Try another payment method!'
    document.querySelector('#msgBox').style.display = 'block';
    document.querySelector('#msg>div>button').addEventListener('click',()=>{
        document.querySelector('#giropay input').checked = '';
        document.querySelector('#msgBox').style.display = 'none';
    })
})

document.querySelector('#paypal input').addEventListener('click',()=>{
    document.querySelector('#visa input').checked = '';
    document.querySelector('#visaForm').style.display = 'none';
    document.querySelector('#ordDiv button').style.backgroundColor = 'orange';
    document.querySelector('#ordDiv button').innerText = 'Pay with PayPal';
})

document.querySelector('#visa input').addEventListener('click',()=>{
    document.querySelector('#paypal input').checked = '';
    document.querySelector('#ordDiv button').style.backgroundColor = 'rgba(0, 0, 255, 0.69)';
    document.querySelector('#ordDiv button').innerText = 'Pay';
    document.querySelector('#visaForm').style.display = 'block';
})

document.querySelector('#ordDiv button').addEventListener('click',()=>{
    if( !document.querySelector('#visa input').checked && !document.querySelector('#paypal input').checked ){
        document.querySelector('#msg>div>p').innerText = 'Please select a payment method first!'
        document.querySelector('#msgBox').style.display = 'block';
        document.querySelector('#msg>div>button').addEventListener('click',()=>{
            document.querySelector('#msgBox').style.display = 'none';
        })
    }

    else if(document.querySelector('#visa input').checked){
        let cardnumber = document.querySelector('#num').value;
        let mmyy = document.querySelector('#mmyy').value;
        let cvv = document.querySelector('#cvv').value;

        if(cvv.length!==4||mmyy===''||cardnumber===''){
            document.querySelector('#msg>div>p').innerText = 'Some payment method input fields are invalid!'
            document.querySelector('#msgBox').style.display = 'block';
            document.querySelector('#msg>div>button').addEventListener('click',()=>{
                document.querySelector('#msgBox').style.display = 'none';
            })
        }

        else {
            document.querySelector('#msgBox1').style.display = 'block';
            document.querySelector('#msg1>div>button').addEventListener('click',()=>{
                let otp = document.querySelector('#otp').value;
                if(otp==='1234') {
                    document.querySelector('#msg2>div>p:nth-child(2)>span:last-child').innerText = localStorage.getItem('gTotal');
                    document.querySelector('#msg2>div>p:nth-child(3)>span:last-child').innerText = Math.round((Math.random()*1000000000)+100000000)
                    document.querySelector('#msgBox2').style.display = 'block';
                    document.querySelector('#msg2>div>button').addEventListener('click',()=>{
                        document.querySelector('#msgBox2').style.display = 'none';
                        window.location.href = 'paySuccess.html';
                    })
                }
                else {
                    alert('Invalid OTP! Try again.')
                }
                document.querySelector('#msgBox1').style.display = 'none';
            })
        }

    }
})