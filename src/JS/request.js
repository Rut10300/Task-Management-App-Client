export async function getUserDetails(userName, password, setworngRequest) {
    try {

        console.log(password);
        const response = await fetch(`http://localhost:8080/users/login`, {
            method: "POST",
            body: JSON.stringify({ username: userName, password: password }),
            headers: {
                'Content-type': 'application/json'
            },
        });
        debugger;
        if (!response.ok) {
            setworngRequest(true);
            throw new Error("Network response was not ok");
        }
        const promiseData = await response.json();
        console.log("client");
        console.log("promise data " + promiseData);
        let data = promiseData.data;
        debugger;
        console.log("data " + data);
        if (data == null) {
            return { code: 304, message: "NotFound", params: null };
        }
        return { code: 200, message: "ok", params: data };
    }
    catch (error) {

        return { code: 100, message: error, params: null };
    }
}

export async function postUserDetails(user, setLoad, setworngRequest) {
    try {
        setLoad(true);
        const response = await fetch(`http://localhost:8080/users`, {
            method: "POST",
            body: JSON.stringify(user),
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
        return { code: 100, message: error, params: null };
    }
}


export async function getMoreInformetionAbouteUser(id, setLoad, setworngRequest, typeInformetion) {
    try {
        //setworngRequest(Math.random()>0.5);
        setLoad(true);
        debugger;
        const response = await fetch(`http://localhost:8080/users/${id}/${typeInformetion}`);
        if (!response.ok) {
            setworngRequest(true);
            throw new Error("Network response was not ok");

        }
        debugger;
        const promiseData = await response.json();

        let data = promiseData;
        setLoad(false)
        if (data == null) {
            return { code: 304, message: "NotFound", params: null };
        }
        return { code: 200, message: "ok", params: data };
    }
    catch (error) {
        setLoad(false);
        return { code: 100, message: error, params: null };
    }
}
export async function putInformetion(id, informetion, setLoad, typeInformetion) {
    try {
        setLoad != null ?? setLoad(true);
        console.log(' i am also hear');
        const response = await fetch(`http://localhost:8080/${typeInformetion}/${id}`, {
            method: "PUT",
            body: JSON.stringify(informetion),
            headers: {
                'Content-type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        console.log("response "+response);
        const promiseData = await response.json();
        setLoad != null ?? setLoad(false);
        await console.log("after json" +promiseData);
        return promiseData;
    }
    catch (error) {
        setLoad != null ?? setLoad(false);
        return false;
    }
}

export async function deleteInformetion(id, typeInformetion) {
    try {
        const response = await fetch(`http://localhost:8080/${typeInformetion}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response;
    }
    catch (error) {
        return false;
    }
}

export async function postInformetion(informetion, setLoad, typeInformetion) {
    try {
        console.log('hii');
        setLoad ?? setLoad(true);
        const response = await fetch(`http://localhost:8080/${typeInformetion}`, {
            method: "POST",
            body: JSON.stringify(informetion),
            headers: {
                'Content-type': 'application/json'
            },
        });
        debugger;
        console.log(response);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const promiseData = await response.json();
        setLoad ?? setLoad(false);
        console.log('seccsess');
        return { code: 200, message: "ok", params: promiseData };
    }
    catch (error) {
        setLoad ?? setLoad(false);
        return { code: 100, message: error, params: null };
    }
}

export async function getCommentsFromServer(postId, setLoad) {
    try {
        setLoad(true)
        const response = await fetch(`http://localhost:8080/comments/${postId}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");

        }
        console.log('res '+response);
        const promiseData = await response.json();
        console.log(promiseData);
        let data = promiseData;
        setLoad(false)
        if (data == null) {
            return { code: 300, message: "NotFound", params: null };
        }
        return { code: 200, message: "ok", params: data };
    }
    catch (error) {
        setLoad(false)

        return { code: 100, message: error, params: null };
    }
}

export async function getPhotos(id, setLoad, setworngRequest, typeInformetion) {
    try {
        setLoad(true);
        const response = await fetch(`http://localhost:8080/${typeInformetion}`);
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
export async function getInformetionById(id, setLoad, setworngRequest, typeInformetion) {
    try {
        setLoad(true);
        const response = await fetch(`http://localhost:8080/${typeInformetion}/${id}`);
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