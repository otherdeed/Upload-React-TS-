export type ErrorData ={
    data:string;
    status:number
}

export const validateError = (error: unknown): ErrorData => {
    if (
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        'response' in error &&
        typeof (error as any).status === 'number'
    ) {
        const errorData = (error as any).response.data;
        const status = (error as any).status;

        if (typeof errorData === 'object' && errorData !== null && 'error' in errorData) {
            // Если errorData — это объект и содержит поле error
            const errorMessage = typeof errorData.error === 'string' ? errorData.error : 'Произошла неизвестная ошибка';
            return {
                data: errorMessage,
                status,
            };
        } else if (typeof errorData === 'string') {
            // Если errorData — это строка
            return {
                data: errorData,
                status,
            };
        }
    }

    // Возвращаем значение по умолчанию для неизвестных ошибок
    return {
        data: 'Произошла неизвестная ошибка',
        status: 500,
    };
}