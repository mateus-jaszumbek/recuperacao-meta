class FormSubmit {
    constructor(settings) {
      this.settings = settings;
      this.form = document.querySelector(settings.form);
      this.formButton = document.querySelector(settings.button);
      this.successMessage = document.querySelector(settings.success);
      this.errorMessage = document.querySelector(settings.error);
  
      this.formButton.addEventListener("click", (event) => this.sendForm(event));
    }
  
    displaySuccess() {
      this.successMessage.style.display = "block";
      this.errorMessage.style.display = "none";
      this.form.reset();
    }
  
    displayError() {
      this.errorMessage.style.display = "block";
      this.successMessage.style.display = "none";
    }
  
    getFormObject() {
      const formObject = {};
      const fields = this.form.querySelectorAll("[name]");
      fields.forEach((field) => {
        formObject[field.getAttribute("name")] = field.value;
      });
      return formObject;
    }
  
    async sendForm(event) {
      event.preventDefault();
      try {
        this.formButton.disabled = true;
        this.formButton.innerText = "Enviando...";
  
        const response = await fetch(this.form.getAttribute("action"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.getFormObject()),
        });
  
        if (response.ok) {
          this.displaySuccess();
        } else {
          this.displayError();
        }
      } catch (error) {
        this.displayError();
        throw new Error(error);
      } finally {
        this.formButton.disabled = false;
        this.formButton.innerText = "Enviar";
      }
    }
  }
  
  const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: ".success",
    error: ".error",
  });

  window.onload = function() {
    document.getElementById('myForm').reset();
  };