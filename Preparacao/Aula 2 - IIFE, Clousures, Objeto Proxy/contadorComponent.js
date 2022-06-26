const BTN_REINICIAR = "btnReiniciar"
const ID_CONTADOR = "contador"
const VALOR_CONTADOR = 100
const PERIODO_INTERVALO = 10

class ContadorComponent {
    constructor() {
        this.inicializar()
    }

    preparContadorProxy() {
        const handler = {
            set: (currentContext, propertyKey, newValue) => {
                console.table({ currentContext, propertyKey, newValue })
                /**
                 * @description parando todo o processamento
                 */
                if (!currentContext.valor) currentContext.efetuarParada()
                currentContext[propertyKey] = newValue
                return true
            }
        }
        /**
         * @description Essa é a função chave desta aula, a Proxy nada mais é que eu event listener que fica monitorando o valor de um objeto
         *              Sempre que o valor mudar, uma função será chamada para executar um determinada ação
         */
        const contador = new Proxy({
            valor: VALOR_CONTADOR,
            efetuarParada: () => { }
        }, handler)

        return contador
    }

    /**
     *@description Função do tipo Clousure para atualizar o texto da tela
     */
    atualizarTexto = ({ elementoContador, contador }) => () => {
        elementoContador.innerHTML = `Começando em <strong>${contador.valor--}</strong> segundos...`
    }

    /**
     *@description Função do tipo Clousure, mas com uma sintaxe diferente, apenas para saber que dá para fazer
     *             Observe que os parâmetros estão entre parênteses, isso chama-se destructuring, onde você manda um objeto
     *             e consegue extrair somente as propriedade que quer utilizar 
     */
    agendarParadaContador({ elementoContador, idIntervalo }) {
        return () => {
            clearInterval(idIntervalo)
            elementoContador.innerHTML = ''
            this.desabilitarBotao(false)
        }
    }

    preparBotao(elementoBotao, iniciarFn) {
        elementoBotao.addEventListener('click', iniciarFn.bind(this))

        /**
         * @description Colocando um valor como default no parâmetro para caso ele venha vazio
         */
        return (valor = true) => {
            const atributo = 'disabled'
            /**
             * @description neste momento estamos utilizando o if ternário. Eu gosto bastante, pois o código fica muito simples
             */
            valor ? elementoBotao.setAttribute(atributo, true) : elementoBotao.removeAttribute(atributo)
        }
    }

    inicializar() {
        const elementoContador = document.getElementById(ID_CONTADOR)
        const contador = this.preparContadorProxy()
        const argumentos = {
            elementoContador,
            contador
        }
        const fnClousure = this.atualizarTexto(argumentos)
        const idIntervalo = setInterval(() => fnClousure(), PERIODO_INTERVALO)

        /**
         * @description criando um contexto separado dentro da função, logo podemos cria uma variável com o mesmo nome que a de cima.
         */
        {
            const elementoBotaoReiniciar = document.getElementById(BTN_REINICIAR)
            const desabilitarBotao = this.preparBotao(elementoBotaoReiniciar, this.inicializar)
            desabilitarBotao()


            const argumentos = { elementoContador, idIntervalo }
            /**
             * @description para o agendamento da parada do contador, estamos utilizando o apply para substituir o valor do this
             */
            const pararContadorFn = this.agendarParadaContador.apply({ desabilitarBotao }, [argumentos])
            contador.efetuarParada = pararContadorFn
        }
    }
}