function geradorPDF() {
    var nome = document.getElementById("nome").value;
    var ra = document.getElementById("ra").value;
    var curso = document.getElementById("curso").value;
    var materia = document.getElementById("materia").value;
    var periodo = document.getElementById("periodo").value;
    var primeiraProva = document.getElementById("primeiraProva").value;
    var segundaProva = document.getElementById("segundaProva").value;
    var trabalho = document.getElementById("trabalho").value;
    var faltas = document.getElementById("faltas").value;

    if (
        primeiraProva != null &&
        segundaProva != null &&
        trabalho != null
    ) {
        var soma = parseFloat(primeiraProva) + parseFloat(segundaProva) + parseFloat(trabalho);
        var media = parseFloat(soma) / 3;
        var situacao;

        if (media > 6 && faltas < 15) situacao = "APROVADO";
        else situacao = "REPROVADO";
        var qtd = 20 - faltas;
        var pdf = new jsPDF({
            orientation: 'p',
            format: 'a4',
            lineHeight: 1.5,
            fontSize: 12,
            fontStyle: 'normal',
            textColor: [0, 0, 0],
            lineCap: 'butt',
            lineJoin: 'miter'
        });

        var inputImagem = document.getElementById('inputImagem');
        var arquivoImagem = inputImagem.files[0];

        if (arquivoImagem) {
            var leitor = new FileReader();

            leitor.onload = function (e) {
                var imagem = e.target.result;

                pdf.addImage(imagem, 'JPEG', 145, 30, 50, 50);
                pdf.text("RENDIMENTO ESCOLAR", 70, 20);
                pdf.setTextColor("black");
                pdf.text("NOME: " + nome, 20, 40);
                pdf.text("RA: " + ra, 20, 50);
                pdf.text("CURSO: " + curso, 20, 60);
                pdf.text("MATÉRIA: " + materia, 20, 70);
                pdf.text("PERÍODO: " + periodo, 20, 80);

                var tableContent = [
                    ["PRIMEIRA PROVA", primeiraProva, "SOMA DAS NOTAS", soma.toPrecision(2)],
                    ["SEGUNDA PROVA", segundaProva, "MÉDIA DAS NOTAS", media.toPrecision(2)],
                    ["TRABALHO", trabalho, "FALTAS", faltas],
                    ["FALTAS RESTANTE", qtd.toPrecision(2), "SITUAÇÃO DO ALUNO", situacao]
                ];

                var x = 20;
                var y = 100; 
                var colWidth1 = 55; 
                var colWidth2 = 35; 
                var colWidth3 = 55; 
                var colWidth4 = 35; 
                var rowHeight = 12;
                var borderWidth = 0.1;

                for (let i = 0; i < tableContent.length; i++) {
                    const row = tableContent[i];

                    for (let j = 0; j < row.length; j++) {
                        const cell = row[j];
                        let colWidth;

                        if (j === 0 || j === 2) {
                            colWidth = colWidth1;
                        } else {
                            colWidth = colWidth2;
                        }

                        pdf.rect(x, y, colWidth, rowHeight, 'S');
                        pdf.text(cell, x + 1, y + 8, { align: 'center' });
                        x += colWidth;
                    }
                    x = 20;
                    y += rowHeight;

                    if ((i + 1) % 4 === 0) {
                        y += rowHeight;
                    }
                }
                pdf.save('CADASTRO.pdf');
            };
            leitor.readAsDataURL(arquivoImagem);
        }
    }
}
