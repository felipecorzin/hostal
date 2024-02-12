import {connect, ConnectOptions} from 'mongoose';

export const dbConnect = () => {
    connect(process.env.MONGODB_URI!, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    } as ConnectOptions).then(
        () => console.log('DB Online'),
        (error) => console.log('Error a la hora de inicializad DB')
    )
}