import * as Realm from 'realm-web';

export const login = async () => {
	let App: Realm.App;
	App =
		App ||
		new Realm.App(
			typeof process === 'undefined'
				? (globalThis as any).VITE_REALM_APPID
				: import.meta.env.VITE_REALM_APPID
		);
	try {
		const credentials = Realm.Credentials.apiKey(
			typeof process === 'undefined'
				? (globalThis as any).VITE_REALM_API_KEY
				: import.meta.env.VITE_REALM_API_KEY
		);
		// Attempt to authenticate
		const user = await App.logIn(credentials);
		return user.mongoClient('mongodb-atlas');
	} catch (err) {
		return false;
	}
};
