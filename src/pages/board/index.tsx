import styles from './styles.module.scss'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi'
import SuportButton from '@/components/SuportButton'
import { useState, FormEvent } from 'react'
import { add } from '@/services/firebaseConnections'
// import { add } from '@/services/firebaseConnections'
// import path from 'path'

interface TarefatorProps{
  user: {
    id: string,
    name: string,
  }
}

function Board({ user }: TarefatorProps) {
 const [input, setInput] = useState('')

 const handleAddTask = async (e: FormEvent) => {
    e.preventDefault()

    if (input === '') {
      alert('Digite uma Tarefa!')
      return;
    }
    
    await add('tasks', {
      created_at: new Date(),
      task: input,
      name: user.name,
    } )
 }
  
  return (
    <>
    <main className={ styles.container }>
      <form onSubmit={handleAddTask}>
        <input
         type="text"
         placeholder="Digite sua tarefa..."
         value={input}
         onChange={(e) => setInput(e.target.value) }
        />
        <button
        type="submit"
        >
          <FiPlus size={25} color="#17181f" />
        </button>
      </form>

      <h1>Você tem 2 tarefas</h1>

      <section>

        <article className={ styles.taskList }>
          <p>Criar app com Next.js 13</p>
          <div className={ styles.actions }>
            <div>

              <div>
                <FiCalendar size={20} color="#ffb800" />
                <time>08 Fevereiro 2023</time>
              </div>

              <button>
                <FiEdit2 size={20} color="#fff" />
                <span>Editar</span>
              </button>

            </div>

            <button>
              <FiTrash size={20} color="#ff3636" />
              <span>Excluir</span>
            </button>

          </div>
        </article>
      </section>

    </main>

    <div className={ styles.vipContainer }>
      <h3>Obrigado por apoiar esse projeto.</h3>
      <div>
        <FiClock size={28} color="#fff" />
        <time>
          Última doação foi à 3 dias.
        </time>
      </div>
    </div>

    <SuportButton />
    </>
    
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
const session = await getSession({ req });

if(!session) {
  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}

const user = {
  name: session.user?.name,
  id: session.user?.image,
}


  return {
    props: {
user
    }
  }
}

export default Board