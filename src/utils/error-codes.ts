const ERROR_CODES = {
    INTERNAL_ERROR: {
        fn:() => {
            return {error: 'Internal Server Error'}
        },
        code: 500
    },
    NOT_FOUND: {
        fn:(customError? :string) => {
            return {error: (customError ?? `${customError} `) + 'Not Found.'}
        },
        code: 404
    },
    BAD_REQUEST: {
        fn:(customError? :string) => {
        return {error: 'Bad Request' + (customError ?? `: ${customError}`)}
        },
        code: 400
    }

}


export default ERROR_CODES;