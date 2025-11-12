import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export function requireAuth(req, res, next) {
    const token = req.cookies['cbp_token'];
    if (!token)
        return res.status(401).json({ error: 'Unauthorized' });
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch {
        res.status(401).json({ error: 'Invalid token' });
    }
}
export function requireAdmin(req, res, next) {
    const user = req.user;
    if (user?.role !== 'admin')
        return res.status(403).json({ error: 'Forbidden' });
    next();
}
//# sourceMappingURL=auth.js.map