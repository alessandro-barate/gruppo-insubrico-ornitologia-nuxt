<script></script>
<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="form-container">
          <form action="" method="get">
            <div class="details-row">
              <label for="name"></label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Nome*"
                required
              />
              <label for="surname"></label>
              <input
                type="text"
                name="surname"
                id="surname"
                placeholder="Cognome*"
                required
              />
            </div>
            <div class="email-row">
              <label for="mail"></label>
              <input
                type="mail"
                name="mail"
                id="mail"
                placeholder="Mail*"
                required
              />
            </div>
            <div class="message-row">
              <label for="message"></label>
              <textarea
                type="text"
                name="message"
                id="message"
                rows="5"
                cols="50"
                placeholder="Scrivi qui il tuo messaggio*"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  width: 100%;
  padding-bottom: 15rem;

  input,
  textarea {
    border: none;
    border-bottom: 1px solid black;
    background-color: transparent;
  }

  .form-container {
    width: 80%;
    text-align: center;
    padding-top: 5rem;
    padding-bottom: 5rem;
    color: red;
    background-color: orange;

    form {
      width: 40%;

      .details-row,
      .email-row {
        margin-bottom: 4rem;
      }

      .details-row {
        display: flex;

        #name,
        #surname {
          width: 48%;
        }
      }
    }
  }
}
</style>
