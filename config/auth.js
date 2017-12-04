module.exports = {

    'facebookAuth' : {
        'clientID'      : '150689502220954', // your App ID
        'clientSecret'  : '61ed2c841b4c59930554bb230af08f1a', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    }
};