
// Clean Firebase Error Message
export const cleanMessage = (error) => {
    try {
        error = error.message?.split(':')[1]?.replace('Error ', '');
        error = error.split('/')[1].split(')')[0];
        error = error.charAt(0).toUpperCase() + error.slice(1);
        return error;
    } catch (error) {
        return error;
    }
};