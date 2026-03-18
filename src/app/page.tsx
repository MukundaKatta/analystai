"use client";

import { useState } from "react";
import { Table2, Plus, Sparkles, Upload, Download, BarChart3, FileText, Trash2, Play, Loader2, Quote, X, PieChart, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

interface DocumentRow {
  id: string;
  name: string;
  file: string;
  status: "uploaded" | "processing" | "analyzed";
}

interface QuestionCol {
  id: string;
  question: string;
}

interface CellData {
  answer: string;
  citation: string;
  confidence: number;
  status: "empty" | "loading" | "filled" | "error";
}

type MatrixData = Record<string, Record<string, CellData>>;

const sampleDocs: DocumentRow[] = [
  { id: "d1", name: "Acme Corp - Annual Report 2025", file: "acme_annual_2025.pdf", status: "analyzed" },
  { id: "d2", name: "TechCo - 10K Filing 2025", file: "techco_10k_2025.pdf", status: "analyzed" },
  { id: "d3", name: "GlobalFin - Quarterly Report Q4", file: "globalfin_q4_2025.pdf", status: "analyzed" },
  { id: "d4", name: "StartupX - Pitch Deck", file: "startupx_pitch.pdf", status: "analyzed" },
  { id: "d5", name: "MegaCorp - ESG Report 2025", file: "megacorp_esg_2025.pdf", status: "analyzed" },
];

const sampleQuestions: QuestionCol[] = [
  { id: "q1", question: "What is the total revenue?" },
  { id: "q2", question: "What is the YoY growth rate?" },
  { id: "q3", question: "How many employees?" },
  { id: "q4", question: "Key risks mentioned?" },
  { id: "q5", question: "ESG initiatives?" },
];

const sampleMatrix: MatrixData = {
  d1: {
    q1: { answer: "$4.2B", citation: "Page 12, Financial Highlights", confidence: 0.95, status: "filled" },
    q2: { answer: "18.5% YoY", citation: "Page 14, Revenue Analysis", confidence: 0.92, status: "filled" },
    q3: { answer: "12,500 employees", citation: "Page 8, Company Overview", confidence: 0.98, status: "filled" },
    q4: { answer: "Supply chain disruptions, regulatory changes, cybersecurity threats", citation: "Page 45, Risk Factors", confidence: 0.88, status: "filled" },
    q5: { answer: "Carbon neutral by 2030, 40% renewable energy", citation: "Page 52, Sustainability", confidence: 0.90, status: "filled" },
  },
  d2: {
    q1: { answer: "$890M", citation: "Page 6, Income Statement", confidence: 0.96, status: "filled" },
    q2: { answer: "32% YoY", citation: "Page 7, Management Discussion", confidence: 0.91, status: "filled" },
    q3: { answer: "3,200 employees", citation: "Page 4, About TechCo", confidence: 0.97, status: "filled" },
    q4: { answer: "Market competition, talent retention, technology obsolescence", citation: "Page 28, Risk Factors", confidence: 0.85, status: "filled" },
    q5: { answer: "Remote-first policy, diversity targets, green office initiative", citation: "Page 35, Social Impact", confidence: 0.82, status: "filled" },
  },
  d3: {
    q1: { answer: "$2.1B", citation: "Page 3, Quarterly Summary", confidence: 0.94, status: "filled" },
    q2: { answer: "8.2% YoY", citation: "Page 5, Performance", confidence: 0.89, status: "filled" },
    q3: { answer: "8,700 employees", citation: "Page 2, Overview", confidence: 0.96, status: "filled" },
    q4: { answer: "Interest rate volatility, credit risk, regulatory compliance", citation: "Page 18, Risk Management", confidence: 0.92, status: "filled" },
    q5: { answer: "Sustainable finance portfolio: $500M, DEI programs expanded", citation: "Page 22, ESG Section", confidence: 0.87, status: "filled" },
  },
  d4: {
    q1: { answer: "$15M ARR", citation: "Slide 8, Financial Metrics", confidence: 0.88, status: "filled" },
    q2: { answer: "180% YoY", citation: "Slide 9, Growth Trajectory", confidence: 0.85, status: "filled" },
    q3: { answer: "85 employees", citation: "Slide 12, Team", confidence: 0.93, status: "filled" },
    q4: { answer: "Market timing, funding dependency, scaling challenges", citation: "Slide 15, Challenges", confidence: 0.78, status: "filled" },
    q5: { answer: "Not specifically addressed", citation: "N/A", confidence: 0.60, status: "filled" },
  },
  d5: {
    q1: { answer: "$28.5B", citation: "Page 4, Financial Overview", confidence: 0.97, status: "filled" },
    q2: { answer: "5.3% YoY", citation: "Page 5, Growth Metrics", confidence: 0.93, status: "filled" },
    q3: { answer: "95,000 employees", citation: "Page 3, Company Profile", confidence: 0.99, status: "filled" },
    q4: { answer: "Climate regulation, geopolitical instability, digital transformation costs", citation: "Page 32, Risk Assessment", confidence: 0.91, status: "filled" },
    q5: { answer: "Net zero by 2040, $2B green investment fund, 50% board diversity", citation: "Page 8, ESG Strategy", confidence: 0.95, status: "filled" },
  },
};

export default function Home() {
  const [documents, setDocuments] = useState<DocumentRow[]>(sampleDocs);
  const [questions, setQuestions] = useState<QuestionCol[]>(sampleQuestions);
  const [matrix, setMatrix] = useState<MatrixData>(sampleMatrix);
  const [selectedCell, setSelectedCell] = useState<{ docId: string; qId: string } | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [activeTab, setActiveTab] = useState<"matrix" | "charts" | "export">("matrix");
  const [loading, setLoading] = useState(false);

  const addQuestion = () => {
    if (!newQuestion.trim()) return;
    const q: QuestionCol = { id: `q${Date.now()}`, question: newQuestion };
    setQuestions([...questions, q]);
    setNewQuestion("");
    toast.success("Question added");
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
    toast.success("Question removed");
  };

  const runAllAnalysis = async () => {
    setLoading(true);
    toast.success("AI analysis running on all cells...");
    setTimeout(() => {
      setLoading(false);
      toast.success("Analysis complete!");
    }, 2000);
  };

  const runCellAnalysis = async (docId: string, qId: string) => {
    setMatrix((prev) => ({
      ...prev,
      [docId]: { ...(prev[docId] || {}), [qId]: { answer: "", citation: "", confidence: 0, status: "loading" } },
    }));
    setTimeout(() => {
      setMatrix((prev) => ({
        ...prev,
        [docId]: { ...(prev[docId] || {}), [qId]: { answer: "AI-generated answer", citation: "Source document", confidence: 0.85, status: "filled" } },
      }));
    }, 1500);
  };

  const getCellData = (docId: string, qId: string): CellData => {
    return matrix[docId]?.[qId] || { answer: "", citation: "", confidence: 0, status: "empty" };
  };

  const selectedCellData = selectedCell ? getCellData(selectedCell.docId, selectedCell.qId) : null;
  const selectedDoc = selectedCell ? documents.find((d) => d.id === selectedCell.docId) : null;
  const selectedQuestion = selectedCell ? questions.find((q) => q.id === selectedCell.qId) : null;

  const chartData = documents.map((doc) => ({
    name: doc.name.split(" - ")[0],
    revenue: parseFloat(getCellData(doc.id, "q1").answer.replace(/[^0-9.]/g, "")) || 0,
    growth: parseFloat(getCellData(doc.id, "q2").answer.replace(/[^0-9.]/g, "")) || 0,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Table2 className="w-7 h-7 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">AnalystAI</span>
            <nav className="flex gap-1 ml-6">
              {(["matrix", "charts", "export"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${activeTab === tab ? "bg-primary-50 text-primary-700" : "text-gray-600 hover:bg-gray-50"}`}>
                  {tab === "matrix" ? "Matrix View" : tab === "charts" ? "Charts" : "Export"}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary flex items-center gap-2"><Upload className="w-4 h-4" /> Upload Docs</button>
            <button onClick={runAllAnalysis} disabled={loading} className="btn-primary flex items-center gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loading ? "Analyzing..." : "Run All AI"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4">
          {activeTab === "matrix" && (
            <div className="space-y-4">
              {/* Add Question */}
              <div className="flex gap-2">
                <input value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addQuestion()}
                  className="input flex-1" placeholder="Add a new question column..." />
                <button onClick={addQuestion} className="btn-secondary flex items-center gap-2"><Plus className="w-4 h-4" /> Add</button>
              </div>

              {/* Matrix Table */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-auto">
                <table className="w-full border-collapse min-w-[1000px]">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-10 bg-gray-100 border border-gray-200 p-3 text-left text-xs font-semibold text-gray-600 uppercase min-w-[250px]">
                        Document
                      </th>
                      {questions.map((q) => (
                        <th key={q.id} className="bg-gray-100 border border-gray-200 p-3 text-left text-xs font-semibold text-gray-600 min-w-[200px]">
                          <div className="flex items-center justify-between">
                            <span className="truncate">{q.question}</span>
                            <button onClick={() => removeQuestion(q.id)} className="p-0.5 rounded hover:bg-gray-200 ml-1"><X className="w-3 h-3 text-gray-400" /></button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.id}>
                        <td className="sticky left-0 z-10 bg-white border border-gray-200 p-3">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                              <p className="text-xs text-gray-400">{doc.file}</p>
                            </div>
                          </div>
                        </td>
                        {questions.map((q) => {
                          const cell = getCellData(doc.id, q.id);
                          return (
                            <td key={q.id} onClick={() => setSelectedCell({ docId: doc.id, qId: q.id })}
                              className={`border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                                selectedCell?.docId === doc.id && selectedCell?.qId === q.id ? "ring-2 ring-primary-500 bg-primary-50" : ""
                              }`}>
                              {cell.status === "loading" ? (
                                <div className="flex items-center gap-2"><Loader2 className="w-3 h-3 animate-spin text-primary-500" /><span className="text-xs text-gray-400">Analyzing...</span></div>
                              ) : cell.status === "filled" ? (
                                <div>
                                  <p className="text-sm text-gray-900">{cell.answer}</p>
                                  {cell.citation && (
                                    <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-0.5"><Quote className="w-2.5 h-2.5" />{cell.citation}</p>
                                  )}
                                  <div className="mt-1 flex items-center gap-1">
                                    <div className="flex-1 bg-gray-200 rounded-full h-1"><div className={`h-1 rounded-full ${cell.confidence >= 0.9 ? "bg-green-500" : cell.confidence >= 0.7 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${cell.confidence * 100}%` }} /></div>
                                    <span className="text-[9px] text-gray-400">{Math.round(cell.confidence * 100)}%</span>
                                  </div>
                                </div>
                              ) : (
                                <button onClick={(e) => { e.stopPropagation(); runCellAnalysis(doc.id, q.id); }}
                                  className="w-full text-center text-xs text-gray-400 hover:text-primary-600 py-2">
                                  <Play className="w-3 h-3 mx-auto" />
                                </button>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "charts" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Data Visualization</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary-600" /> Revenue Comparison</h3>
                  <div className="space-y-3">
                    {chartData.map((item) => (
                      <div key={item.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-700">{item.name}</span>
                          <span className="text-sm font-medium text-gray-900">${item.revenue}B</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-6">
                          <div className="bg-primary-500 h-6 rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${Math.min((item.revenue / 30) * 100, 100)}%` }}>
                            <span className="text-xs text-white font-medium">${item.revenue}B</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary-600" /> Growth Rates</h3>
                  <div className="space-y-3">
                    {chartData.map((item) => (
                      <div key={item.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-700">{item.name}</span>
                          <span className={`text-sm font-medium ${item.growth > 20 ? "text-green-600" : item.growth > 10 ? "text-yellow-600" : "text-gray-600"}`}>{item.growth}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div className={`h-4 rounded-full ${item.growth > 20 ? "bg-green-500" : item.growth > 10 ? "bg-yellow-500" : "bg-blue-500"}`}
                            style={{ width: `${Math.min(item.growth, 100)}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><PieChart className="w-5 h-5 text-primary-600" /> Employee Distribution</h3>
                <div className="grid grid-cols-5 gap-4">
                  {documents.map((doc) => {
                    const cell = getCellData(doc.id, "q3");
                    return (
                      <div key={doc.id} className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-lg font-bold text-gray-900">{cell.answer || "N/A"}</p>
                        <p className="text-xs text-gray-500 mt-1">{doc.name.split(" - ")[0]}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === "export" && (
            <div className="max-w-2xl mx-auto space-y-6 mt-8">
              <h2 className="text-xl font-bold text-gray-900">Export Analysis</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { format: "CSV", desc: "Spreadsheet-compatible format" },
                  { format: "Excel (.xlsx)", desc: "Microsoft Excel format" },
                  { format: "PDF Report", desc: "Formatted analysis report" },
                  { format: "JSON", desc: "Structured data format" },
                ].map((exp) => (
                  <button key={exp.format} className="card hover:border-primary-300 text-left transition-colors">
                    <Download className="w-6 h-6 text-primary-600 mb-2" />
                    <p className="font-medium text-gray-900">{exp.format}</p>
                    <p className="text-sm text-gray-500">{exp.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selectedCell && selectedCellData && selectedCellData.status === "filled" && (
          <div className="w-80 border-l border-gray-200 bg-white p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Cell Detail</h3>
              <button onClick={() => setSelectedCell(null)} className="p-1 rounded hover:bg-gray-100"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Document</p>
                <p className="text-sm text-gray-900">{selectedDoc?.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Question</p>
                <p className="text-sm text-gray-900">{selectedQuestion?.question}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Answer</p>
                <p className="text-sm text-gray-900 font-medium">{selectedCellData.answer}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Citation</p>
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg flex items-start gap-1">
                  <Quote className="w-3 h-3 mt-0.5 text-gray-400 flex-shrink-0" />
                  {selectedCellData.citation}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Confidence</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${selectedCellData.confidence >= 0.9 ? "bg-green-500" : selectedCellData.confidence >= 0.7 ? "bg-yellow-500" : "bg-red-500"}`}
                      style={{ width: `${selectedCellData.confidence * 100}%` }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{Math.round(selectedCellData.confidence * 100)}%</span>
                </div>
              </div>
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" /> Re-analyze
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
