define(["require", "exports"], function(require, exports) {
    var About = (function () {
        function About() {
            this.displayName = 'About';
            this.description = 'The <b><i>disco</i>Arguments</b> Proof-of-Concept (PoC) is an exemplary implementation of <a href="https://code.google.com/p/wikiarguments/" title="Click here, to visit the WikiArguments project home." target="_blank">WikiArguments</a> to show the integration of tools from this specific area of discussion methods within the disco framework. To learn more about the idea behind the <b>Discussion Ontology Framework (d!sco)</b> visit our <a href="http://disco.codeplex.com" title="Click here, to visit the d!sco project home." target="_blank">project homepage on CodePlex</a>.';
            this.features = [
                'Pure d!sco <a href="http://wiki.piratenpartei.de/wiki/images/3/37/DiscussionSystem-Overview.jpg" title="Click here, to see the d!sco discussion system overview." target="_blank"><b>Type A</b></a> plug-in.',
                'Based on the <i>d!sco Client Library</i>, the javascript part of the d!sco framework for easy access to the ontology.'
            ];
        }
        About.prototype.activate = function () {
            return true;
        };
        return About;
    })();

    return new About();
});
//# sourceMappingURL=about.js.map
