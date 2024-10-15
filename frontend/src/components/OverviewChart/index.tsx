import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Engenharia de Software', Avaliacoes: 5 },
  { name: 'Banco de Dados', Avaliacoes: 0 },
  { name: 'Inteligência Artificial', Avaliacoes: 12 },
]; 

export default function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={300}> 
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" /> 
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#ddd' }} />
        <Bar dataKey="Avaliacoes" fill="#4a90e2" barSize={40} /> 
      </BarChart>
    </ResponsiveContainer>
  );
}