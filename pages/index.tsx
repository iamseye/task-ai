import Head from 'next/head';
import { Inter } from 'next/font/google';

import Header from '@/components/Header.component';
import TaskGenerator from '@/components/TaskGenerator.component';
import { useState, SyntheticEvent } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [inputTodo, setInputTodo] = useState('');

  const onSubmitGenerate = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (inputTodo) {
      //
    }
  };

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Task breakdown</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col align-middle p-24 min-h-screen">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Breakdown your tasks, for real
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <TaskGenerator
            setInputTodo={setInputTodo}
            onSubmitGenerate={onSubmitGenerate}
          />
        </div>
      </main>
    </div>
  );
}
