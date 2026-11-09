import { useState } from "react";

export default function App() {
  // Input controlado: o valor vem do estado
  const [texto, setTexto] = useState("");
  const [recados, setRecados] = useState([
    { id: 1, texto: "Entregar atividade até sexta", importante: false },
    { id: 2, texto: "Trazer notebook na próxima aula", importante: true },
  ]);

  function adicionar() {
    const limpo = texto.trim();
    if (!limpo) return;
    setRecados([{ id: Date.now(), texto: limpo, importante: false }, ...recados]);
    setTexto("");
  }

  function remover(id) {
    setRecados(recados.filter((r) => r.id !== id));
  }

  function alternarImportante(id) {
    setRecados(
      recados.map((r) => (r.id === id ? { ...r, importante: !r.importante } : r))
    );
  }

  return (
    <main className="container">
      <h1>Painel de Recados</h1>
      <p className="subtitulo">Organize comunicados da turma com clareza ✨</p>

      <div className="card form">
        <input
          type="text"
          placeholder="Digite um recado"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && adicionar()}
        />
        <button className="btn btn-adicionar" onClick={adicionar}>
          Adicionar
        </button>
      </div>

      {recados.length === 0 ? (
        <div className="card vazio">Nenhum recado por aqui. Adicione o primeiro! 📭</div>
      ) : (
        <ul className="lista">
          {recados.map((r) => (
            <li key={r.id} className={`card item ${r.importante ? "importante" : ""}`}>
              <p>{r.texto}</p>
              <div className="acoes">
                <button className="btn btn-importante" onClick={() => alternarImportante(r.id)}>
                  {r.importante ? "Desmarcar" : "Importante"}
                </button>
                <button className="btn btn-remover" onClick={() => remover(r.id)}>
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
