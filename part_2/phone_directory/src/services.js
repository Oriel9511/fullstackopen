import axios from 'axios';

const URL = 'http://localhost:3001/persons';

export async function getAll(){
    try{
        const response = await axios.get(URL);
        return response.data;
    }catch(e){
        console.error(e);
    }
}

export async function savePerson(person){
    try{
        const existing = await axios.get(`http://localhost:3001/persons?name=${person.name}`);
        if(!!existing.data.length){
            if(window.confirm(`${person.name} is already added to phonebook, replace the old number with the new one?`)){
                const response = await axios.put(URL+'/'+existing.data[0].id, person);
                return response.data;
            }
        }else{
            const response = await axios.post(URL, person);
            return response.data;
        }

    }catch(e){
        console.error(e);
        throw e
    }
}

export async function deletePerson(person){
    try{
        const response = await axios.delete(URL+'/'+person.id);
        return response.data;
    }catch(e){
        console.error(e);
    }
}

export async function editByName(person){
    try{
        const response = await axios.delete(URL+'/'+person.id);
        return response.data;
    }catch(e){
        console.error(e);
    }
}
