import styles from "./styles.module.scss";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from "react-icons/fi";
import SuportButton from "@/components/SuportButton";
import { useState, FormEvent } from "react";
import { add, getTasks, deleteTask } from "@/services/firebaseConnections";
import { format } from "date-fns";
import Link from "next/link";

type TaskList = {
  created: string | Date;
  formatedDate?: string;
  task: string | undefined;
  name: string;
  id: string | undefined;
}

interface TarefatorProps {
	user: {
		id: string | undefined;
		name: string;
	};

  dataFormated: string
}


function Board({ user, dataFormated }: TarefatorProps) {
	const [input, setInput] = useState("");
	const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(dataFormated));

	const handleAddTask = async (e: FormEvent) => {
		e.preventDefault();

		if (input === "") {
			alert("Digite uma Tarefa!");
			return;
		}

		await add("tasks", {
			created_at: new Date(),
			task: input,
			name: user.name,
		}).then((doc) => {
			console.log("sucess");
			let data = {
        id: doc?.id,
				created: new Date(),
				formatedDate: format(new Date(), "dd MMMM yyyy"),
				task: input,
				name: user.name,
			};
			setTaskList([...taskList, data]);
			setInput("");
		});
	};

  const handleDelete = (id:string) => deleteTask(id).then(() => {
    const taskDeleted = taskList.filter(task => task.id !== id)
    setTaskList(taskDeleted)
  });
  

	return (
		<>
			<main className={styles.container}>
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

									<button>
										<FiEdit2
											size={20}
											color='#fff'
										/>
										<span>Editar</span>
									</button>
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

			<div className={styles.vipContainer}>
				<h3>Obrigado por apoiar esse projeto.</h3>
				<div>
					<FiClock
						size={28}
						color='#fff'
					/>
					<time>Última doação foi à 3 dias.</time>
				</div>
			</div>

			<SuportButton />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

  const data = await getTasks()
   console.log(data);
  
 
  const dataFormated = JSON.stringify(data.map(u => {

    return {
      ...u,
      formatedDate: format(u.created_at.toDate(), 'dd MMMM yyyy'),
    }
  }).filter(a => a.name === session.user?.name).sort((a,b) => a.created_at - b.created_at)) 


	const user = {
		name: session.user?.name,
		id: session.user?.image,
	};

	return {
		props: {
			user,
      dataFormated,
		},
	};
};

export default Board;
