
const form = document.getElementById("contact-form");


form.addEventListener("submit", function(e) {
    e.preventDefault;

    emailjs
        .sendForm(
            "service_uxprsfz",
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
            }
        );      
})