import { app } from './app';
import { env } from './core/env';

app.listen(env.PORT, () => {
    console.log(`Server Running on PORT ${env.PORT}`);
})
