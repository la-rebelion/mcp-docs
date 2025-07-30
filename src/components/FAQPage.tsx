import React from 'react';
import Head from '@docusaurus/Head';
import Heading from '@theme/Heading';


const FAQ_DATA = [
  {
    question: "What is an MCP server?",
    answer:
      "An **MCP server** is not a traditional server implementation. In the context of the Model Context Protocol (MCP), a server is simply a reference to a set of **tools** that can be invoked by an AI agent. You don't need to build a backend — just expose the contract that describes what tools are available.",
  },
  {
    question: "Do I need to implement my own MCP server?",
    answer:
      "**No.** You can generate the MCP contract dynamically from your existing API using tools like the **HAPI Server**. This eliminates the need to manually implement logic or wrap your backend in new infrastructure.",
  },
  {
    question: "How is MCP different from OpenAPI or Swagger?",
    answer:
      "**OpenAPI (Swagger)** defines how machines talk to machines using HTTP protocols. **MCP**, on the other hand, defines how **AI agents talk to applications** using structured contracts over JSON-RPC. You can actually generate MCP contracts from OpenAPI specs — the two are complementary.",
  },
  {
    question: "Can I convert my OpenAPI spec into an MCP contract?",
    answer:
      "Yes. You can convert OpenAPI to MCP using automated tools like **HAPI Server**, which transforms your existing Swagger files into tool definitions readable by LLMs.",
  },
  {
    question: "What are MCP tools?",
    answer:
      "**MCP tools** are individual functions or operations that an AI agent can invoke. Each tool has a name, description, and JSON input schema — similar to an OpenAPI operation. For example, an endpoint like `GET /users` becomes a tool like `getUsers`.",
  },
  {
    question: "What is the HAPI Server?",
    answer:
      "**HAPI Server** stands for Headless API. It reads OpenAPI specs and dynamically serves an MCP contract, making your backend instantly usable by AI agents without rewriting code.",
  },
  {
    question: "What is runMCP?",
    answer:
      "**runMCP** is a lightweight gateway that manages multiple MCP servers (like HAPI instances). It acts as a routing layer between AI agents and your tools, similar to an API gateway but focused on MCP contracts.",
  },
  {
    question: "How does chatMCP work?",
    answer:
      "**chatMCP** is the client interface that lets users (or LLMs) invoke MCP tools interactively — like having an AI assistant that knows how to call your backend via the MCP contract.",
  },
  {
    question: "What's the benefit of contract-first MCP development?",
    answer:
      "This approach allows **faster integration**, **no backend duplication**, and **agent-readiness out of the box**. Instead of reinventing your stack for AI agents, you let them plug into what already exists — securely and scalably.",
  },
];

export const FAQPage: React.FC = () => {
  return (
    <>
      <h1>Frequently Asked Questions: MCP, OpenAPI, API-first</h1>
      {FAQ_DATA.map((faq, index) => (
        <div key={index}>
          <hr />
          <Heading id={`faq-${index}`} as='h3'>❓ {faq.question}</Heading>
          <p>{ faq.answer }</p>
        </div>
      ))}
    </>
  );
};

export const FAQHead: React.FC = () => {
  return (
    <head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ_DATA.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
            null,
            2
          ),
        }}
      />
    </head>
  );
};
