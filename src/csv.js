// RFC 4180 compliant CSV parser.
//
// parseCsv(text) -> array of records, where each record is an array of
// string fields. It supports quoted fields, escaped double quotes (""),
// embedded commas and newlines, CRLF and LF line endings, and ignores the
// empty trailing line produced by a final line break.
export function parseCsv(text) {
  const records = [];
  let record = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  // Tracks whether the current record has any content at all, so that a quoted
  // empty field (`""`) is not mistaken for the empty trailing line.
  let recordStarted = false;

  const endField = () => {
    record.push(field);
    field = "";
  };

  const endRecord = () => {
    endField();
    records.push(record);
    record = [];
  };

  while (i < text.length) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          // Escaped double quote inside a quoted field.
          field += '"';
          i += 2;
        } else {
          // Closing quote.
          inQuotes = false;
          i += 1;
        }
      } else {
        field += char;
        i += 1;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      recordStarted = true;
      i += 1;
    } else if (char === ",") {
      endField();
      recordStarted = true;
      i += 1;
    } else if (char === "\r") {
      endRecord();
      recordStarted = false;
      i += text[i + 1] === "\n" ? 2 : 1;
    } else if (char === "\n") {
      endRecord();
      recordStarted = false;
      i += 1;
    } else {
      field += char;
      recordStarted = true;
      i += 1;
    }
  }

  // Only emit a final record if the current record actually started. This drops
  // the empty trailing line left by a terminating line break while preserving a
  // real final field (e.g. "a,") or a quoted empty field (e.g. `""`).
  if (recordStarted) {
    endRecord();
  }

  return records;
}

// A field only needs quoting when it contains a delimiter, a line break or a
// double quote. The empty string is also quoted so that a record consisting of
// a single empty field survives the round trip instead of collapsing into the
// blank line that parseCsv ignores at end of input.
const needsQuotes = (field) =>
  field === "" ||
  field.includes(",") ||
  field.includes('"') ||
  field.includes("\n") ||
  field.includes("\r");

const quoteField = (field) => '"' + field.replaceAll('"', '""') + '"';

// Serialize an array of records into an RFC 4180 CSV string. Fields are quoted
// only when necessary; records are separated by CRLF.
export function stringifyCsv(rows) {
  return rows
    .map((row) =>
      row
        .map((value) => {
          const field = String(value);
          return needsQuotes(field) ? quoteField(field) : field;
        })
        .join(","),
    )
    .join("\r\n");
}
