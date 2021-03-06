function Configuracoes ()
{
    this.carregar = function ()
    {
        var str = '';
        
        str = "<center><button onclick='simula()'>Executar</button></center>";
        str += "<div id='erros'></div>"
        
        str += "<form><fieldset><legend style='font-size:14pt'>Configurações</legend>";
        
        str += "<center><table class='formulario'> <tr><td>";
        
        str += "Marque os métodos que devem ser utilizados:<br>"
        str += "<input type='checkbox' name='metodo' value='FCFS'>First Come First Served<br>";
        str += "<input type='checkbox' name='metodo' value='SJF'>Shortest Job First<br>";
        str += "<input type='checkbox' name='metodo' value='FPS'>Fixed-priority pre-emptive scheduling<br>";
        str += "<input type='checkbox' name='metodo' value='RR'>Round Robin<br>";
        
        str += "</td> <td>";
        
        str += "N. de processos: ";
            str += "<select id='nProcessos' style='margin-left:13px'>";
            str += "<option value=0>Selecione</option>";
            str += "<option value=2>2</option>";
            str += "<option value=3>3</option>";
            str += "<option value=4>4</option>";
            str += "<option value=5>5</option>";
            str += "<option value=6>6</option>";
            str += "<option value=7>7</option>";
            str += "<option value=8>8</option>";
            str += "<option value=9>9</option>";
            str += "<option value=10>10</option>";
            str += "<option value=11>11</option>";
            str += "<option value=12>12</option>";
            str += "<option value=13>13</option>";
            str += "<option value=14>14</option>";
            str += "<option value=15>15</option>";
            str += "<option value=16>16</option>";
            str += "<option value=17>17</option>";
            str += "<option value=18>18</option>";
            str += "<option value=19>19</option>";
            str += "<option value=20>20</option>";
        str += "</select><br>";
        str += "Quantun: ";
        str += "<input id='quantun' type='text' style='width:65px; margin-left:60px; margin-top:3px; margin-bottom:3px;' value='5'><br>";
        str += "Troca de contexto: ";
        str += "<input id='trocaContexto' type='text' style='width:65px' value='0'><br>";
        str += "</td>"
        
        str += "</tr></table></center>";
        str += "<div id='processos'></div>";       
        str +=  "</form></fieldset>";
        
        str += "<center><button onclick='simula()'>Executar</button></center>";
        
        $("#aba0").html(str);
        
        this.telaCriarProcessos();
    };
    
    
    
    
    this.telaCriarProcessos = function ()
    {
        var str = "";
        var color;
        
        for (var i=1; i<=20; i++)
        {
            color = selecionarCor(i);
            
            str += "<div id='processo"+i+"'><form><fieldset class='processos'><legend>Processo " + i + "</legend> <center>";
            str += "Burst: <input id='burst" + i + "' type='text' style='width:50px; margin-left:32px; margin-bottom:3px;' value='5'>";
            str += "<br>";
            str += "Chegada: <input id='chegada" + i + "' type='text' style='width:50px; margin-left:11px; margin-bottom:3px;' value='0'>";
            str += "<br>";
            str += "Prioridade: <input id='prioridade" + i + "' type='text' style='width:50px; margin-bottom:3px;' value='5'>";
            str += "<br>";
            str += "<table><tr><td style='background: " + color + "' width='130px' height='10px'><td><tr></table>";
            str += "</center></fieldset></form></div>";
        }
        
        $("#processos").html(str);
        
        for (i=1; i<=20; i++)
            document.getElementById("processo"+i).style.display="none";
            //document.getElementById("processo"+i).style.visibility="hidden";
    }
    
    this.ativarTelaProcessos = function (n)
    {
        for (var i=1; i<=n; i++)
        {
            document.getElementById("processo"+i).style.display="inline";
            //document.getElementById("processo"+i).style.visibility="visible";
        }
            
        for (i=n+1; i<=20; i++)
        {
            document.getElementById("processo"+i).style.display="none";
            //document.getElementById("processo"+i).style.visibility="hidden";
            //document.getElementById("processo"+i).style.height="1px";
        }
        
        //document.getElementById("processos").style.display="none";
        document.getElementById("processos").setAttribute('class', 'a');
    }
    
    
    this.submeterDados = function ()
    {
        var erro, erros;
        var nProcessos = eval(document.getElementById("nProcessos").value);
        var quantun = parseInt(document.getElementById("quantun").value);
        var trocaContexto = parseInt(document.getElementById("trocaContexto").value);
        var processos = [];

        document.getElementById("erros").setAttribute("class", "");
        $("#erros").html("");
        
        erro = this.validarDados();
        if (erro.length != 0)
        {
            erros = erro.split(':');
            erros.pop();
            
            erro = '<p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>';
            erro += '<strong>Erro(s): </strong>';
            erro += '<ul>';
            
            for (indice in erros)
                erro += "<li>" + erros[indice] + ".</li>";
                
            erro += '</ul></p>';
            
            document.getElementById("erros").setAttribute("class", "ui-state-error ui-corner-all");
            //$("#erros").html(erro);
            
            return erro;
        }
        
        
        
        for (var i=1; i<=nProcessos; i++)
        {
            var color = selecionarCor(i);
            var burst = parseInt(document.getElementById("burst"+i).value);
            var chegada = parseInt(document.getElementById("chegada"+i).value);
            var prioridade
            if (document.getElementsByName("metodo")[2].checked)
                prioridade = parseInt(document.getElementById("prioridade"+i).value);
            else
                prioridade = 0;
            
            processos.push(new Processo (i, burst, chegada, prioridade, color));
        }
        
        
        return processos;
    }

    this.validarDados = function ()
    {
        var erros = "";
        
        var metodos = document.getElementsByName("metodo");
        var valido = false;
        
        for (indice in metodos)
            if (metodos[indice].checked)
                valido = true;
                
        if (!valido)
            erros += "Pelo menos um método deve ser marcado:";
            
        
        
        var processos = eval(document.getElementById("nProcessos").value);
        if (processos == 0)
            erros += "Escolha a quantidade de processos:";
        
        if (metodos[3].checked)
        {
            var quantun = parseInt(document.getElementById("quantun").value);
            if (!quantun && quantun != 0)
                erros += "Insira o valor do quantun:";
            else if (quantun < 0)
                erros += "O quantun não pode ser negativo:";
        }
                
        if (metodos[2].checked || metodos[3].checked)
        {
            var trocaContexto = parseInt(document.getElementById("trocaContexto").value);
            if (!trocaContexto && trocaContexto != 0)
                erros += "Insira o tempo para troca de contexto:";
            else if (trocaContexto < 0)
                erros += "O tempo de troca de contexto não pode ser negativo:";
        }
        
        for (var i=1; i<=processos; i++)
        {
            var burst = parseInt(document.getElementById("burst"+i).value);
            var chegada = parseInt(document.getElementById("chegada"+i).value);
            var prioridade = parseInt(document.getElementById("prioridade"+i).value);

            if (!burst || burst < 1)
            {
                erros += "Burst do processo " + i + " é inválido:";
            }
            if ((!chegada || chegada < 1) && chegada != 0)
            {
                erros += "Tempo de chegada do processo " + i + " é inválido:";
            }
            if (metodos[2].checked)
            {
                if (!prioridade || prioridade < 1)
                    erros += "Prioridade do processo " + i + " é inválido:";
            }
        }
        
        return erros;
    }
    
    this.carregar();
}

function selecionarCor (i)
{
    var color;
    switch(i)
    {
        case 1: color="#0000ff"; break;
        case 2: color="#ff0000"; break;
        case 3: color="#00ff00"; break;
        case 4: color="#ffff00"; break;
        case 5: color="#00ffff"; break;
        case 6: color="#990000"; break;
        case 7: color="#ccff66"; break;
        case 8: color="#999933"; break;
        case 9: color="#000066"; break;
        case 10: color="#ff00ff"; break;
        case 11: color="#006633"; break;
        case 12: color="#ffffcc"; break;
        case 13: color="#ffcccc"; break;
        case 14: color="#9900cc"; break;
        case 15: color="#84b02c"; break;
        case 16: color="#cc9933"; break;
        case 17: color="#996633"; break;
        case 18: color="#cc99ff"; break;
        case 19: color="#660066"; break;
        default: color="#ff6666";
    }
    return color;
}