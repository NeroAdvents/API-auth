# API-auth

• Créez un endpoint POST /users, qui créera un nouvel utilisateur en BDD, a partir des
paramètres username et password contenu dans la requête HTTP (le password devra être crypter
avant d’être enregistrer dans la base de donnée)
• Créez un endpoint POST /users/connect qui prendra en paramètre dans la requête HTTP
username et password, l’API vérifiera la correspondance du username et du password avec la
BDD et renverra un token qui aura un temps de validité d’exactement 42 secondes, et contenant
l’username si les informations de la requête sont valides, sinon renverra une erreur au client
mais également sur la console du serveur
• Créez un endpoint GET /users qui prendra en paramètre dans le header de la requête le token
générer précédemment, l’API devra verifier la validité de ce token, et si il est valide renverra la
liste des username de tout les user enregistré en BDD, trié par ordre alphabétique inversé. Si le
token est invalide l’API répondra avec un status 401
• Créez un endpoint DELETE /users/:username qui supprime un user de la BDD
