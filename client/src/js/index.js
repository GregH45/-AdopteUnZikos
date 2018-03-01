(() => {

  $(document).ready(() => {

    // Vérification de la connexion utilisateur
    App.userLoaded(() => {
      if (App.User.connected && App.User.name) {
        window.location = 'material.html';
      }
    });

    /**
     *  Envoi du formulaire de connexion
    **/
    $('#connexion').on('submit', (e) => {
      if (App.User.conected) {
        window.location = 'material.html';
      } else {
        let $this = $(e.currentTarget),
            pseudo = $('#pseudo').val(),
            role = $('#role').is(':checked');

        e.preventDefault();

        App.Messenger.sendMessage('user_connexion', {
            pseudo: pseudo,
            star: role
          }, (response) => {
            if (response.status) {
              window.location = 'material.html';
            } else {
              console.log('erreur');
              $('p.error').text(response.msg).show();
            }
          });
      }

    });

  });

})();