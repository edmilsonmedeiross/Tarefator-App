import styles from "./styles.module.scss";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from "react-icons/fi";
import SuportButton from "@/components/SuportButton";
import { useState, FormEvent } from "react";
import { add, getTasks } from "@/services/firebaseConnections";
import { format } from "date-fns";
import Link from "next/link";

type TaskList = {
  created: string | Date;
  formatedDate?: string;
  task: string;
  name: string;
  id: string;
}

interface TarefatorProps {
	user: {
		id: string;
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

				<h1>Você tem 2 tarefas</h1>

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

								<button>
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
 
  const dataFormated = JSON.stringify(data.map(u => {
    return {
      formatedDate: format(u.created_at.toDate(), 'dd MMMM yyyy'),
      ...u,
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
