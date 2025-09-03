class Document {
  constructor(format, type, author, createdAt, signed) {
    this.format = format; 
    this.type = type;     
    this.author = author;
    this.createdAt = createdAt;
    this.signed = signed;
  }

  showDetails() {
    console.log(
      `${this.type.toUpperCase()} em ${this.format.toUpperCase()} - Autor: ${this.author}, Criado em: ${this.createdAt}, Assinado: ${this.signed ? "Sim" : "Não"}`
    );
  }
}

class DocumentBuilder {
  constructor() {
    this.catalog = {
      pdf: ["report", "invoice"],
      docx: ["report", "invoice"]
    };

    this.format = null;
    this.type = null;
    this.author = null;
    this.createdAt = null;
    this.signed = false;
  }

  setFormat(format) {
    if (!this.catalog[format]) {
      throw new Error(`Formato "${format}" não suportado.`);
    }
    this.format = format;

    this.type = null;
    return this;
  }

  setType(type) {
    if (!this.format) {
      throw new Error("Defina o formato antes do tipo.");
    }
    if (!this.catalog[this.format].includes(type)) {
      throw new Error(`Tipo "${type}" não existe para o formato "${this.format}".`);
    }
    this.type = type;
    return this;
  }

  setAuthor(author) {
    this.author = author;
    return this;
  }

  setCreatedAt(date) {
    this.createdAt = date;
    return this;
  }

  setSigned(signed) {
    this.signed = signed;
    return this;
  }

  build() {
    if (!this.format || !this.type || !this.author || !this.createdAt) {
      throw new Error("Preencha todos os campos obrigatórios.");
    }
    return new Document(this.format, this.type, this.author, this.createdAt, this.signed);
  }
}

try {
  const doc1 = new DocumentBuilder()
    .setFormat("pdf")
    .setType("report")
    .setAuthor("Marcos")
    .setCreatedAt("03/09/2025")
    .setSigned(true)
    .build();

  doc1.showDetails();
} catch (e) {
  console.error(e.message);
}

try {
  const invalidDoc = new DocumentBuilder()
    .setFormat("docx")
    .setType("invoice")
    .setAuthor(null) 
    .setCreatedAt("02/09/2025")
    .build();
} catch (e) {
  console.error(e.message);
}
