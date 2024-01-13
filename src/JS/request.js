export async function getUserDetails(userName,password, setLoad, setworngRequest) {
    try {
        setLoad(true);
        const response = await fetch(`http://localhost:3000/users?username=${userName}&&website=${password}`);
        console.log(response);
        if (!response.ok) {
            setworngRequest(true);
            throw new Error("Network response was not ok");

        }
        const promiseData = await response.json();
        let data = promiseData[0];
        setLoad(false)
        if (data == null) {

            return { code: 300, message: "NotFound", params: null };
        }
        return { code: 200, message: "ok", params: data };
    }
    catch (error) {
        setLoad(false);
        return { code: 100, message: error, params: null };
    }
}

export async function postUserDetails(userName, password, setLoad, setworngRequest) {
    try {
        setLoad(true);
        const response = await fetch(`http://localhost:3000/users`, {
            method: "POST",
            body: JSON.stringify({
                username: userName,
                website: password
            }),
            headers: {
                'Content-type': 'application/json'
            },
        });
        if (!response.ok) {
            setworngRequest(true);
            throw new Error("Network response was not ok");
        }
        const promiseData = await response.json();
        setLoad(false);
        return { code: 200, message: "ok", params: promiseData };
    }
    catch (error) {
        setLoad(false);
        console.log();
        return { code: 100, message: error, params: null };
    }
}
export async function putUserDetails(user) {

    try {
        setLoad(true);
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json'
            },
        });
        console.log(response);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const promiseData = await response.json();
        console.log(promiseData);
        setLoad(false);
        return promiseData;
    }
    catch (error) {
        setLoad(false);
        return false;
    }
}

export async function getMoreInformetionAbouteUser(id, setLoad, setworngRequest,typeInformetion) {
    try {
        setLoad(true);
        const response = await fetch(`http://localhost:3000/users/${id}/${typeInformetion}`);
        if (!response.ok) {
            setworngRequest(true);
            throw new Error("Network response was not ok");

        }
        const promiseData = await response.json();
        let data = promiseData;
        setLoad(false)
        if (data == null) {
            return { code: 300, message: "NotFound", params: null };
        }
        return { code: 200, message: "ok", params: data };
    }
    catch (error) {
        setLoad(false);
        return { code: 100, message: error, params: null };
    }
}
export async function putInformetion(id, informetion,setLoad,typeInformetion) {
    try {
        setLoad!=null?? setLoad(true);
        const response = await fetch(`http://localhost:3000/${typeInformetion}/${id}`, {
            method: "PUT",
            body: JSON.stringify(informetion),
            headers: {
                'Content-type': 'application/json'
            },
        });
        console.log(response);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const promiseData = await response.json();
        setLoad!=null??  setLoad(false);
        return promiseData;
    }
    catch (error) {
        setLoad!=null??  setLoad(false);
        return false;
    }
}

export async function deleteInformetion(id,typeInformetion) {
    try {
        const response = await fetch(`http://localhost:3000/${typeInformetion}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const promiseData = await response.json();
        return promiseData;
    }
    catch (error) {
        return false;
    }
}

export async function postInformetion(informetion,setLoad,typeInformetion) {
    try {
        setLoad?? setLoad(true);
        const response = await fetch(`http://localhost:3000/${typeInformetion}`, {
            method: "POST",
            body: JSON.stringify(informetion),
            headers: {
                'Content-type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const promiseData = await response.json();
        setLoad?? setLoad(false);
        return { code: 200, message: "ok", params: promiseData };
    }
    catch (error) {
        setLoad?? setLoad(false);
        console.log();
        return { code: 100, message: error, params: null };
    }
}

export  async function getCommentsFromServer(id)
{
    try {
       
        const response = await fetch(`http://localhost:3000/comments?postId=${id}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");

        }
        const promiseData = await response.json();
        let data = promiseData;
        
        if (data == null) {
            return { code: 300, message: "NotFound", params: null };
        }
        return { code: 200, message: "ok", params: data };
    }
    catch (error) {
    
        return { code: 100, message: error, params: null };
    }
}

export async function getPhotos(id, setLoad, setworngRequest,typeInformetion) {
    console.log(typeInformetion);
    try {
        setLoad(true);
        const response = await fetch(`http://localhost:3000/${typeInformetion}`);
        if (!response.ok) {
            setworngRequest(true);
            throw new Error("Network response was not ok");

        }
        const promiseData = await response.json();
        let data = promiseData;
        setLoad(false)
        if (data == null) {
            return { code: 300, message: "NotFound", params: null };
        }
        return { code: 200, message: "ok", params: data };
    }
    catch (error) {
        setLoad(false);
        return { code: 100, message: error, params: null };
    }
}