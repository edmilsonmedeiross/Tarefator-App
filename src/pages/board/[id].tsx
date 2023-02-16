import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { getDocTask } from "@/services/firebaseConnections";
import { format } from "date-fns";
import styles from './task.module.scss';
import { FiCalendar } from 'react-icons/fi'

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
      <article className={ styles.container }>
        <div className={ styles.actions }>
          <div>
            <FiCalendar size={30} color="#fff" />
            <span>Tarefa criada:</span>
            <time>{ task.createdFormat }</time>
          </div>
        </div>
        <p>{ task.task }</p>
      </article>
    </>
  )
}

export default Task

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
  const { id }:any = params
  const session: any = await getSession({req})

  if (!session?.vip) {
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
  
  .catch(() => {
    return {};
  })
 
  if (Object.keys(data).length === 0) {
    return {
      redirect: {
        destination: '/board',
        permanent: false,
      }
    }
  }

  return {
    props: {
      data,
    }
  }
}