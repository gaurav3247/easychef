import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerLicense } from '@syncfusion/ej2-base';

const root = ReactDOM.createRoot(document.getElementById('root'));
registerLicense('Mgo+DSMBaFt+QHFqVk5rWU5DaV1CX2BZell0Q2ldd04QCV5EYF5SRHJfRVxkSn5QcERmXnw=;Mgo+DSMBPh8sVXJ1S0d+X1lPc0BFQmFJfFBmQWlbeVR0fEUmHVdTRHRcQlljTn9UdUVgX35ZdHc=;ORg4AjUWIQA/Gnt2VFhhQlJMfVpdWnxLflF1VWdTfVh6cF1WACFaRnZdQV1nSXlScUZjWnlfeH1W;MTY1NDM2MkAzMjMxMmUzMTJlMzMzOGJMaWxiY3UzbkJkdlJhWUxIdjhtZTJzeHUwRk0yblNQTGE0U1E2bDhWcmM9;MTY1NDM2M0AzMjMxMmUzMTJlMzMzOFhRek1jSHFFSEhEUE5iMWRQSmR1anM5NkNwUlhOakRDVnhCeGw4WFdpWEE9;NRAiBiAaIQQuGjN/V0d+XU9HflRHQmRWfFN0RnNddVx2flFOcDwsT3RfQF5jTX5Ud0JgWXxYcnBdRQ==;MTY1NDM2NUAzMjMxMmUzMTJlMzMzOEkwalo3bTYyUWdUOWZzOHJ2MzZ3WWM2U0J4ckJ6T2QyZGE2NFEweTY5a1E9;MTY1NDM2NkAzMjMxMmUzMTJlMzMzOE1yYnJ2bFJIczFwb3RlY1JpTGM5WlU5anh6dkhnV2NRdnk2alpjQ2FZTnM9;Mgo+DSMBMAY9C3t2VFhhQlJMfVpdWnxLflF1VWdTfVh6cF1WACFaRnZdQV1nSXlScUZjWnldcHFW;MTY1NDM2OEAzMjMxMmUzMTJlMzMzOEc4NGozOFdzc2FRQ0xOU1Y0MzdqaldKWCtiN0FWU1JTUEhqdXRkSlFtRUU9;MTY1NDM2OUAzMjMxMmUzMTJlMzMzOExSdFNjODczMGV1MVdrKzdnbDFLY0ozQTBoK1BhRGEwdEJZUFoyR21FRG89;MTY1NDM3MEAzMjMxMmUzMTJlMzMzOEkwalo3bTYyUWdUOWZzOHJ2MzZ3WWM2U0J4ckJ6T2QyZGE2NFEweTY5a1E9');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
