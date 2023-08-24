import jwt from "jsonwebtoken";
import { Request } from "express";
import { TokenData, TokenTime } from "../../../types";
import { onSuccess, createError } from "../../common/middlewares/error.middleware";

class AuthenticationService {
	private key: string; //key must be 16+ characters long
	private time: string;
	private req: Request;
	private refreshKey: string;

	constructor(req: Request, time: TokenTime) {
		this.req = req;
		this.time = time;
		this.key = process.env.JWT_KEY;
		this.refreshKey = process.env.REFRESH_TOKEN_KEY;
	}

	public generateToken(data: TokenData) {
		try {
			const token = jwt.sign(data, this.key, { expiresIn: this.time });
			const refreshToken = jwt.sign(data, this.refreshKey, { expiresIn: "3d" });
			return {
				refreshToken,
				accessToken: token
			};
		} catch (e) {
			throw createError("Could not create token!", 500);
		}
	}

	public refreshToken() {
		if (this.req.cookies?.jwt) {
			const refreshToken = this.req.cookies.jwt;
			// Verifying refresh token
			return jwt.verify(refreshToken, this.refreshKey, (err, decoded) => {
				if (err) {
					throw createError("Unauthorized action", 406);
				} else {
					// Correct token we send a new access token
					const accessToken = jwt.sign(
						{
							name: decoded.name,
							email: decoded.email,
							expiresIn: this.time,
							userId: decoded.userId
						},
						this.key,
						{
							expiresIn: this.time
						}
					);
					return { token: { accessToken } };
				}
			});
		} else {
			throw createError("Unauthorized!", 406);
		}
	}
}

export default AuthenticationService;
