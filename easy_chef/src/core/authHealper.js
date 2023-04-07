export default function authHeader() {
    const tokens = JSON.parse(localStorage.getItem('user_tokens'));

    if (tokens && tokens.access) {
        // for Node.js Express back-end
        return { Authorization: 'Bearer ' + tokens.access };
    } else {
        return {};
    }
}
