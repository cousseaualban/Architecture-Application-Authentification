const express = require('express');
const authController = require('../controllers/auth.controller');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Créé
 *       401:
 *         description: Erreur
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Connexion réussie
 *       401:
 *         description: Erreur
 */
router.post('/login', authController.login);

//route apres login, Mise en place de la vérification JWT (user connecté)
// 401 : Token manquant/ Format du token invalide/ Token invalide ou expire
// 200 : Utilisateur connecte
/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Vérifie le token JWT et récupère l'utilisateur connecté
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur connecté
 *       401:
 *         description: Token manquant, invalide ou expiré
 */
router.get('/me', requireAuth, authController.me);

module.exports = router;
