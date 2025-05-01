
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const EmbedInstructions: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('iframe');

  // This would be the actual URL of your deployed application
  const appUrl = window.location.origin;
  
  const iframeCode = `<iframe 
  src="${appUrl}/embed" 
  title="Cleanroom Quote Request Form" 
  width="100%" 
  height="800px" 
  style="border: none; max-width: 800px; margin: 0 auto;" 
  allowfullscreen></iframe>`;

  const scriptCode = `<div id="cleanroom-quote-form"></div>
<script>
  (function() {
    var iframe = document.createElement('iframe');
    iframe.src = "${appUrl}/embed";
    iframe.title = "Cleanroom Quote Request Form";
    iframe.style.border = "none";
    iframe.style.width = "100%";
    iframe.style.height = "800px";
    iframe.style.maxWidth = "800px";
    iframe.style.margin = "0 auto";
    
    var container = document.getElementById('cleanroom-quote-form');
    container.appendChild(iframe);
  })();
</script>`;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Form Embed Instructions</h2>
      <p className="mb-6 text-gray-700">
        Copy the code below to embed this form on your website. You can use either an iframe or JavaScript approach.
      </p>

      <Tabs defaultValue="iframe" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="iframe">iframe Embed</TabsTrigger>
          <TabsTrigger value="javascript">JavaScript Embed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="iframe" className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-sm overflow-x-auto">
              {iframeCode}
            </pre>
          </div>
          <Button 
            onClick={() => handleCopy(iframeCode)}
            className="bg-cleanroom-500 hover:bg-cleanroom-600 text-white"
          >
            {copied && activeTab === 'iframe' ? 'Copied!' : 'Copy Code'}
          </Button>
        </TabsContent>
        
        <TabsContent value="javascript" className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-sm overflow-x-auto">
              {scriptCode}
            </pre>
          </div>
          <Button 
            onClick={() => handleCopy(scriptCode)}
            className="bg-cleanroom-500 hover:bg-cleanroom-600 text-white"
          >
            {copied && activeTab === 'javascript' ? 'Copied!' : 'Copy Code'}
          </Button>
        </TabsContent>
      </Tabs>

      <div className="mt-8 border-t pt-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Supabase Integration</h3>
        <p className="text-gray-700 mb-4">
          To connect this form to Supabase, you'll need to:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Connect your Lovable project to Supabase using the Supabase button in the top menu</li>
          <li>Create a table in Supabase with fields matching the form data structure</li>
          <li>Set appropriate security rules for your Supabase table</li>
        </ol>
      </div>
    </div>
  );
};

export default EmbedInstructions;
