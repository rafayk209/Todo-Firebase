
import { useFormik } from "formik";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import { useEffect, useState } from "react"
import { collection, addDoc, onSnapshot, query, serverTimestamp, orderBy, deleteDoc, doc } from "firebase/firestore"
import { db } from './Firebase'


const todoCol = collection(db, "todo")

const validationSchema = yup.object({
  title: yup
    .string('Enter your email')
    .required('Email is required'),
});

async function del(id) {
  await deleteDoc(doc(todoCol, id));
}

function Todo() {
  const [todo, settodo] = useState([])

  useEffect(() => {

    const q = query(todoCol, orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {

      let temp = [];
      snapshot.forEach((doc) => {

        let id = doc.id;
        let data = doc.data();

        temp.unshift({
          id: id,
          title: data.title,
          description: data.description
        });
      })
      settodo(temp)
    });

    return () => {
      unsubscribe()
      console.log("unsub")
    };
  }, []);

  const formik = useFormik({

    initialValues: {
      title: "",
      description: ""
    },
    onSubmit: async (values) => {
      try {
        const docRef = await addDoc(todoCol, {
          title: values.title,
          description: values.description,
          timestamp: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    validationSchema: validationSchema,
  });


  return (
    <Box sx={{ flexGrow: 1, m: 2 }} >


      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            color="primary"
            id="outlined-basic"
            label="Title"
            variant="outlined"

            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}

            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          <TextField
            fullWidth
            color="primary"
            id="outlined-basic"
            label="Description"
            variant="outlined"

            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}

            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />

          <Button fullWidth variant="contained" color="primary" type="submit">Add Todo</Button>
        </Stack>

      </form>

      <div>
        {todo.map((eachTodo, i) => {

          return (<div key={i}>
            <br />

            {/* <div> id: {eachTodo.id}</div>
            <div> title: {eachTodo.title}</div>
            <div> description: {eachTodo.description}</div> */}

<table class="table">
  <thead>
    <tr>
      
      <th scope="col">Keys</th>
      <th scope="col">Title</th>
      <th scope="col">Discription</th>
      <th scope="col">Action</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      
      <td>{eachTodo.id}</td>
      <td>{eachTodo.title}</td>
      <td>{eachTodo.description}</td>
      <td><button type="button" onClick={() => { del(eachTodo.id) }} class="btn btn-primary">Delete</button></td>
      
    </tr>
   
  </tbody>
</table>

            <br />
          </div>)
        })}

      </div>
    </Box>
  );
}

export default Todo;
