const { createApp } = Vue;

createApp({
    data() {
        return {
            display: "0",
            numeroAnterior: null,
            numeroAtual: '',
            operador: null,
            operadorClicado: false
        }
    },
    methods: {
        resetDisplay() {
            if (this.operadorClicado) {
                this.display = '';
                this.operadorClicado = false;
            }
        },
        lidarBotao(valor) {
            this.resetDisplay();
            switch (valor) {
                case '*':
                case '/':
                case '-':
                case '+':
                    this.lidarOperador(valor);
                    break;
                case '.':
                    this.lidarDecimal();
                    break;
                case 'C':
                    this.lidarLimpar();
                    break;
                case '=':
                    this.lidarIgual();
                    break;
                default:
                    this.lidarNumero(valor);
            }
        },
        lidarOperador(valor) {
            if (this.numeroAnterior === null) {
                /// Armazena o valor do display como o `numeroAnterior`
                this.numeroAnterior = this.display;
              } else if (this.operador) {
                /// Calcula o resultado usando `calcular` se um operador já estiver sido escolhido
                const resultado = this.calcular(this.numeroAnterior, this.numeroAtual, this.operador);
                /// Atualiza o display com o resultado como string
                this.display = String(resultado);
                /// Atualiza `numeroAnterior` com o novo valor do display
                this.numeroAnterior = this.display;
                /// Limpa `numeroAtual`
                this.numeroAtual = '';
            }
            /// Atualiza `operador` com o novo valor (`valor`)
            this.operador = valor;
            /// Seta `operadorClicado` como true
            this.operadorClicado = true;
        },
        lidarDecimal() {
            /// Verifica se possui um ponto decimal
            if (!this.display.includes('.')) {
                /// Se não houver ponto decimal, adiciona um
                this.display += '.';
            }
        },
        lidarLimpar() {
            this.display = "0";
            this.numeroAnterior = null;
            this.numeroAtual = '';
            this.operador = null;
            this.operadorClicado = false;
        },
        lidarIgual() {
            /// Verifica se operador e número anterior foram definidos
            if (this.operador && this.numeroAnterior !== null) {
              /// Realiza o cálculo usando a função .calcular
              const resultado = this.calcular(this.numeroAnterior, this.display, this.operador);
              /// Atualiza o display com o resultado
              this.display = String(resultado);
              /// Limpa as variáveis para a próxima operação
              this.numeroAnterior = null;
              this.operador = null;
              this.numeroAtual = '';
            }
        },
        lidarNumero(valor) {
            if (this.display === "0") {
                this.display = valor;
            } else {
                this.display += valor;
            }
            this.numeroAtual = this.display;
        },
        calcular(num1, num2, operador) {
            /// Converte para números flutuante (se necessário)
            num1 = parseFloat(num1);
            num2 = parseFloat(num2);
            /// Realiza o cálculo de acordo com o operador
            if (operador === '+') return num1 + num2; /// adição
            if (operador === '-') return num1 - num2; /// subtração
            if (operador === '*') return num1 * num2; /// multiplicação
            if (operador === '/') return num1 / num2; /// divisão
        }
    }
}).mount("#app");
