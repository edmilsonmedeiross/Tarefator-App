import styles from "./styles.module.scss";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock, FiX } from "react-icons/fi";
import SuportButton from "@/components/SuportButton";
import { useState, FormEvent } from "react";
import { add, getTasks, deleteTask, refreshTask } from "@/services/firebaseConnections";
import { format, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";

type TaskList = {
  created: string | Date;
  formatedDate?: string | any;
  task: string;
  name: string;
  id: string;
	created_at: string | Date;
	user_id: string;
}

interface TarefatorProps {
	user: {
	created: string | Date;
  formatedDate?: string | any;
  task: string;
  name: string;
  id: string;
	created_at: string | Date | null;
	user_id: string;
	vip: boolean;
	lastDonate: string | Date;
	};

  dataFormated: string;
}


function Board({ user, dataFormated }: TarefatorProps) {
	const [input, setInput] = useState("");
	const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(dataFormated));

  const [taskEdit, setTaskEdit] = useState<TaskList | null>(null)

	const handleAddTask = async (e: FormEvent) => {
		e.preventDefault();

		if (input === "") {
			alert("Digite uma Tarefa!");
			return;
		}

    if (taskEdit) {
      refreshTask(taskEdit.id, input).then(() => {
        let data = taskList
        const taskIndex = taskList.findIndex(iten => iten.id === taskEdit.id);
        data[taskIndex].task = input;

        setTaskList(data)
        setTaskEdit(null)
        setInput('')
      })

      return;
    }

		await add("tasks", {
			created_at: new Date(),
			task: input,
			name: user.name,
			user_id: user.id
		}).then((doc) => {
			console.log("sucess");
			let data = {
        id: doc?.id,
				created: new Date(),
				formatedDate: format(new Date(), "dd MMMM yyyy"),
				task: input,
				name: user.name,
			};
			setTaskList([...taskList, data] as any);
			setInput("");
		});
	};

  const handleDelete = (id:string) => deleteTask(id).then(() => {
    const taskDeleted = taskList.filter(task => task.id !== id)
    setTaskList(taskDeleted)
  });

  const handleEditTask = (task: TaskList) => {
    setTaskEdit(task)
    setInput(task.task)
  }
  
  const handleCancelEdit = () => {
    setInput('')
    setTaskEdit(null)
  }

	return (
		<>
			<main className={styles.container}>
        {taskEdit && (
          <span className={ styles.warnText }>
            <button onClick={ handleCancelEdit }>
              <FiX size={25} color="red"/>
            </button>
            Você está editando uma tarefa...
          </span>
        )}
				<form onSubmit={handleAddTask}>
					<input
						type='text'
						placeholder='Digite sua tarefa...'
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button type='submit'>
						<FiPlus
							size={25}
							color='#17181f'
						/>
					</button>
				</form>

				{ 
          taskList.length ?
            <h1>Você tem {taskList.length} {taskList.length === 1 ? 'tarefa!' : 'tarefas!'}</h1> :
            <h1>Digite uma tarefa!</h1>
        }

				<section>
					{taskList.map((task, index) => (
						<article key={index} className={styles.taskList}>
              <Link href={`/board/${task.id}`}>
							  <p>{task.task}</p>
              </Link>
							<div className={styles.actions}>
								<div>
									<div>
										<FiCalendar
											size={20}
											color='#ffb800'
										/>
										<time>{task.formatedDate}</time>
									</div>

								{user.vip && (
									<button onClick={() => handleEditTask(task)} >
										<FiEdit2
											size={20}
											color='#fff'
										/>
										<span>Editar</span>
								  </button>
								)}
									
								</div>

								<button  onClick={() =>{ handleDelete(task.id) }}>
									<FiTrash
										size={20}
										color='#ff3636'
									/>
									<span>Excluir</span>
								</button>
							</div>
						</article>
					))}
				</section>
			</main>

			{user.vip && (
			<div className={styles.vipContainer}>
				<h3>Obrigado por apoiar esse projeto.</h3>
				<div>
					<FiClock
						size={28}
						color='#fff'
					/>
					<time>Última doação foi {formatDistance(new Date(user.lastDonate), new Date(), { locale: ptBR })}</time>
				</div>
			</div>
			)}

			<SuportButton />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session: any = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

  const data: any = await getTasks()
	
  const dataFormated: string = JSON.stringify(data.map((u: any)  => {
    return {
      ...u,
      formatedDate: format(u.created_at.toDate(), 'dd MMMM yyyy'),
    }
  }).filter((a: any) => a.user_id === session?.id).sort((a: any,b: any) => a.created_at - b.created_at));

	const user: any = {
		name: session.user?.name,
		id: session?.id,
		vip: session?.vip,
		lastDonate: session?.lastDonate,
	};

	return {
		props: {
			user,
      dataFormated,
		},
	};
};

export default Board;
