
const form = document.getElementById("contact-form");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const msg = document.getElementById("msg");
const phoneNumber = document.getElementById("phoneNumber");

form.addEventListener("submit", (e) => {
    e.preventDefault;
    console.log(e.target);
    sendEmail(e)
})

emailjs.init("user_5X6CajhDjKCwrtOu5WaYy");
const sendEmail = (e) => {
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