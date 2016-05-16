function CPU ()
{
    this.processo;
    this.ocupado;
    
    
    this.construtor = function ()
    {
        this.processo = null;
        this.ocupado = false;
    };
    
    
    
    /*
        Aloca a CPU para o processo p
        Retorno: true  - aloca��o ocorreu com sucesso
                 false - caso a CPU j� esteja ocupada
    */
    this.addProcesso = function (p)
    {
        if (this.ocupado)
        {
            return false;
        }
        else
        {
            this.processo = p;
            this.ocupado = true;
            return true;
        }
    };
    
    
    
    /*
        Retira o processo que est� usando a CPU
        Retorno: o processo preempitado
    */
    this.preempitaProcesso = function ()
    {
        var p = this.processo;
        this.processo = null;
        this.ocupado = false;
        return p;
    }
    
    
    
    /*
        Incrementa o tempo de execu��o do processo
        Retorno: 0 - n�o h� processo na CPU
                 p - processo que foi executado
    */
    this.act = function ()
    {
        var p = this.processo;
        
        if (!this.ocupado)
            return null;
        
        if (this.processo.incrementaTExecucao())
        {
            this.proceso = null;
            this.ocupado = false;
        }
        
        return p;
    };
    
    
    
    this.construtor();
}