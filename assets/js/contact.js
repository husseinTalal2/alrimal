
const form = document.getElementById("contact-form");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const msg = document.getElementById("msg");
const phoneNumber = document.getElementById("phoneNumber");




const sendEmail = (e) => {
    e.preventDefault();
    
    emailjs
        .sendForm(
            "service_mxydsfb",
            "template_3d1cyn5",
            e.target,
            "user_5X6CajhDjKCwrtOu5WaYy"
        )
        .then(
            (result) => {
                alert("your message sent successfully");
            },
            (error) => {
                alert(error.text);
                console.log(error.text);
            }
        );
};