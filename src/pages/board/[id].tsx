import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { getDocTask } from "@/services/firebaseConnections"
import { format } from "date-fns";

type Task = {
  id: string;
  created_at: string | Date;
  createdFormat?: string;
  task: string;
  name: string;
}

interface TaskListProps {
  data: string;
}

function Task({ data }: TaskListProps) {
  const task = JSON.parse(data) as Task;
  return (
    <>
      <div>Task</div>
      <h2>{task.task}</h2>
    </>
  )
}

export default Task

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
  const { id } = params
  const session = await getSession({req})

  if (!session) {
    return {
      redirect: {
        destination: '/board',
        permanent: false,
      }
    }
  }

  const data = await getDocTask(id)
  .then((snapshot) => {
    const data = {
      id: id,
      name: snapshot?.name,
      created: snapshot?.created_at,
      createdFormat: format(snapshot?.created_at.toDate(), 'PPPPpppp'),
      task: snapshot?.task
    }
    return JSON.stringify(data);
  })
 
  return {
    props: {
      data,
    }
  }
}