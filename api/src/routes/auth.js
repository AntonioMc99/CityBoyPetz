import { Router } from 'express';
import jwt from 'jsonwebtoken';
const router = Router();
const ADMIN_EMAIL = process.env.OWNER_EMAIL;
// Simple single-admin login
router.post('/login', (req, res) => {
    const { email, pass } = req.body;
    if (email === ADMIN_EMAIL && pass === process.env.JWT_SECRET) {
        const token = jwt.sign({ sub: email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res
            .cookie('cbp_token', token, { httpOnly: true, sameSite: 'lax', secure: true, maxAge: 7 * 24 * 3600 * 1000 })
            .json({ ok: true });
    }
    res.status(401).json({ error: 'Invalid credentials' });
});
router.post('/logout', (_req, res) => {
    res.clearCookie('cbp_token').json({ ok: true });
});
export default router;
//# sourceMappingURL=auth.js.map