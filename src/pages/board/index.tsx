import styles from './styles.module.scss'
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi'
import SuportButton from '@/components/SuportButton'

function Board() {
  return (
    <>
    <main className={ styles.container }>
      <form>
        <input
         type="text"
         placeholder="Digite sua tarefa..."
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

export default Board